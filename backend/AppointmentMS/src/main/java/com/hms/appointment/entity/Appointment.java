package com.hms.appointment.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "appointment")
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long appointmentId;
    
    private Long patientId;
    private String patientName;
    private Long doctorId;
    private String doctorName;
    private Long departmentId;
    private String departmentName;
    
    private LocalDateTime appointmentDate;
    private String timeSlot;
    private String sessionType; // MORNING, AFTERNOON, EVENING
    
    @Enumerated(EnumType.ORDINAL)
    private AppointmentStatus status = AppointmentStatus.SCHEDULED;
    
    private String notes;
    private String bookedBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public enum AppointmentStatus {
        SCHEDULED, CANCELLED, COMPLETED, RESCHEDULED
    }
}