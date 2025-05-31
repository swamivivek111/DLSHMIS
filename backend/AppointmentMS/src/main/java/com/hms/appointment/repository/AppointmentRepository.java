package com.hms.appointment.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.hms.appointment.dto.AppointmentStatus;
import com.hms.appointment.entity.Appointment;

public interface AppointmentRepository extends CrudRepository<Appointment, Long>{

List<Appointment> findByPatientId(Long patientId);
List<Appointment> findByDoctorId(Long doctorId);
List<Appointment> findByStatus(AppointmentStatus status);
List<Appointment> findByAppointmentDateTimeBetween(LocalDateTime start, LocalDateTime end);
    
}