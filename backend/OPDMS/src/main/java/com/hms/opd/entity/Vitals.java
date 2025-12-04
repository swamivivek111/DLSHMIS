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
@Table(name = "vitals")
public class Vitals {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vitalId;
    
    @Column(nullable = false)
    private Long visitId;
    
    @Column(nullable = false)
    private Long patientId;
    
    private Double temperature; // Celsius
    private String bloodPressure; // Systolic/Diastolic
    private Integer heartRate; // BPM
    private Integer respiratoryRate; // Per minute
    private Double oxygenSaturation; // Percentage
    private Double height; // CM
    private Double weight; // KG
    private Double bmi; // Calculated
    private String painScale; // 1-10
    
    private String recordedBy;
    
    @Column(nullable = false)
    private LocalDateTime recordedAt = LocalDateTime.now();
    
    private String notes;
}