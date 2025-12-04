package com.hms.appointment.repository;

import com.hms.appointment.entity.Appointment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import com.hms.appointment.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    
    Page<Appointment> findByPatientNameContainingIgnoreCaseOrDoctorNameContainingIgnoreCase(
        String patientName, String doctorName, Pageable pageable);
    
    List<Appointment> findByDoctorIdAndAppointmentDateBetween(
        Long doctorId, LocalDateTime startDate, LocalDateTime endDate);
    
    @Query("SELECT a.timeSlot FROM Appointment a WHERE a.doctorId = :doctorId AND DATE(a.appointmentDate) = DATE(:date) AND a.sessionType = :sessionType AND a.status = 0")
    List<String> findBookedTimeSlots(@Param("doctorId") Long doctorId, 
                                   @Param("date") LocalDateTime date, 
                                   @Param("sessionType") String sessionType);
    
    boolean existsByPatientIdAndDoctorIdAndStatus(Long patientId, Long doctorId, Appointment.AppointmentStatus status);
}