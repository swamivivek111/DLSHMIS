package com.hms.appointment.service;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.entity.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface AppointmentService {
    
    AppointmentDTO createAppointment(AppointmentDTO appointmentDTO);
    
    AppointmentDTO updateAppointment(Long id, AppointmentDTO appointmentDTO);
    
    void deleteAppointment(Long id);
    
    AppointmentDTO getAppointmentById(Long id);
    
    Page<Appointment> getAllAppointments(String search, Pageable pageable);
    
    AppointmentDTO cancelAppointment(Long id);
    
    AppointmentDTO rescheduleAppointment(Long id, LocalDateTime newDate, String newTimeSlot);
    
    List<String> getAvailableTimeSlots(Long doctorId, LocalDateTime date);
    
    List<AppointmentDTO> getDoctorAppointments(Long doctorId, LocalDateTime startDate, LocalDateTime endDate);
    
    Map<String, Object> getDoctorSchedule(Long doctorId, String date);
}