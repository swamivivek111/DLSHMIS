package com.hms.appointment.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.dto.AppointmentStatus;
import com.hms.appointment.entity.Appointment;
import com.hms.appointment.exception.HMSException;

public interface AppointmentService {

    Long scheduleAppointment(AppointmentDTO appointmentDTO) throws HMSException;

    AppointmentDTO updateAppointment(Long id, AppointmentDTO appointmentDTO)throws HMSException;

    void cancelAppointment(Long id)throws HMSException;

    void completeAppointment(Long id)throws HMSException;

    void deleteAppointment(Long id);

    Optional<Appointment> getAppointmentById(Long id);

    List<Appointment> getAllAppointments();

    List<Appointment> getAppointmentsByPatientId(Long patientId);

    List<Appointment> getAppointmentsByDoctorId(Long doctorId);

    List<Appointment> getAppointmentsByStatus(AppointmentStatus status);

    List<Appointment> getAppointmentsBetweenDates(LocalDateTime start, LocalDateTime end);

    Appointment rescheduleAppointment(Long id, LocalDateTime newDateTime)throws HMSException;
}
