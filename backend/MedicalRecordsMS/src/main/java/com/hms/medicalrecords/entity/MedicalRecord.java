package com.hms.medicalrecords.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "medical_records")
public class MedicalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Long patientId;
    
    @Column(nullable = false)
    private String patientName;
    
    @Column(nullable = false)
    private Long doctorId;
    
    @Column(nullable = false)
    private String doctorName;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String diagnosis;
    
    @Column(columnDefinition = "TEXT")
    private String prescription;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    @Column(name = "visit_date")
    private LocalDateTime visitDate;
    
    @PrePersist
    protected void onCreate() {
        if (visitDate == null) {
            visitDate = LocalDateTime.now();
        }
    }
}