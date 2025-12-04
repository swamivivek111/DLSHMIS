package com.hms.IPDMS.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "admissions")
public class Admission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long admissionId;
    
    @Column(nullable = false)
    private Long patientId;
    
    @Column(nullable = false)
    private Long doctorId;
    
    @Column(nullable = false)
    private Long hospitalId;
    
    private Long departmentId;
    private Long wardId;
    private Long roomId;
    private Long bedId;
    
    @Column(nullable = false)
    private LocalDateTime admissionDate = LocalDateTime.now();
    
    private LocalDateTime dischargeDate;
    
    @Enumerated(EnumType.STRING)
    private AdmissionStatus status = AdmissionStatus.ADMITTED;
    
    @Enumerated(EnumType.STRING)
    private AdmissionType admissionType = AdmissionType.EMERGENCY;
    
    private String reasonForAdmission;
    private String diagnosis;
    private String notes;
    
    public enum AdmissionStatus {
        ADMITTED, DISCHARGED, TRANSFERRED, CANCELLED
    }
    
    public enum AdmissionType {
        EMERGENCY, PLANNED, ELECTIVE, OBSERVATION
    }
}