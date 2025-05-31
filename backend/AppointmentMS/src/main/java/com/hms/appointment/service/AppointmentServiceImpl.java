package com.hms.appointment.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentStatus;
import com.hms.appointment.entity.Appointment;
import com.hms.appointment.exception.HMSException;
import com.hms.appointment.repository.AppointmentRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService{
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired 
	private APIService apiService;

    @Override
    public Long scheduleAppointment(AppointmentDTO appointmentDTO) throws HMSException {
        Boolean isDoctorExists=apiService.isDoctorExists(appointmentDTO.getDoctorId()).block();//Calling of UserMS service from AppointmentMS
        Boolean isPatientExists=apiService.isPatientExists(appointmentDTO.getPatientId()).block();//Calling of UserMS service from AppointmentMS
        
        if(isDoctorExists && isPatientExists){
            appointmentDTO.setStatus(AppointmentStatus.SCHEDULED);
            return appointmentRepository.save(appointmentDTO.toEntity()).getId();
        }else{
            throw new HMSException("DOCTOR_OR_PATIENT_NOT_EXISTS");
        }
        //return new Long(0);
    }

    @Override
    public AppointmentDTO updateAppointment(Long id, AppointmentDTO updated) throws HMSException {
        Appointment existing = appointmentRepository.findById(id)
            .orElseThrow(() -> new HMSException("APOOINTMENT_NOT_FOUND"));
        existing.setAppointmentDateTime(updated.getAppointmentDateTime());
        existing.setReason(updated.getReason());
        existing.setNotes(updated.getNotes());
        return appointmentRepository.save(existing).toDTO();
    }

    @Override
    public void cancelAppointment(Long id) throws HMSException {
        Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new HMSException("APOOINTMENT_NOT_FOUND"));
        appointment.setStatus(AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    @Override
    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    @Override
    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return (List<Appointment>) appointmentRepository.findAll();
    }

    @Override
    public List<Appointment> getAppointmentsByPatientId(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    @Override
    public List<Appointment> getAppointmentsByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    @Override
    public List<Appointment> getAppointmentsByStatus(AppointmentStatus status) {
        return appointmentRepository.findByStatus(status);
    }

    @Override
    public List<Appointment> getAppointmentsBetweenDates(LocalDateTime start, LocalDateTime end) {
        return appointmentRepository.findByAppointmentDateTimeBetween(start, end);
    }

    @Override
    public Appointment rescheduleAppointment(Long id, LocalDateTime newDateTime) throws HMSException {
        Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new HMSException("APOOINTMENT_NOT_FOUND"));
        appointment.setAppointmentDateTime(newDateTime);
        appointment.setStatus(AppointmentStatus.RESCHEDULED);
        return appointmentRepository.save(appointment);
    }

    @Override
    public void completeAppointment(Long id) throws HMSException {
        Appointment appointment = appointmentRepository.findById(id)
            .orElseThrow(() -> new HMSException("APOOINTMENT_NOT_FOUND"));
        appointment.setStatus(AppointmentStatus.COMPLETED);
        appointmentRepository.save(appointment);
    }
}
