package com.hms.opd.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "opd_prescriptions")
public class OPDPrescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long prescriptionId;
    
    @Column(nullable = false)
    private Long visitId;
    
    @Column(nullable = false)
    private Long patientId;
    
    @Column(nullable = false)
    private Long doctorId;
    
    @Column(nullable = false)
    private String medicationName;
    
    private String dosage;
    private String frequency;
    private String duration;
    private String instructions;
    private String route; // Oral, IV, IM, etc.
    
    @Enumerated(EnumType.STRING)
    private PrescriptionStatus status = PrescriptionStatus.PRESCRIBED;
    
    @Column(nullable = false)
    private LocalDateTime prescribedDate = LocalDateTime.now();
    
    private LocalDateTime dispensedDate;
    private String dispensedBy;
    
    private String notes;
    
    public enum PrescriptionStatus {
        PRESCRIBED, DISPENSED, CANCELLED, MODIFIED
    }
}