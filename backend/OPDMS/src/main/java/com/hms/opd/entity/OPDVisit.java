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
@Table(name = "opd_visits")
public class OPDVisit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long visitId;
    
    @Column(nullable = false)
    private Long patientId;
    
    @Column(nullable = false)
    private Long doctorId;
    
    @Column(nullable = false)
    private Long hospitalId;
    
    private Long departmentId;
    
    @Column(nullable = false)
    private LocalDateTime visitDate;
    
    @Enumerated(EnumType.STRING)
    private VisitStatus status = VisitStatus.REGISTERED;
    
    @Enumerated(EnumType.STRING)
    private VisitType visitType = VisitType.CONSULTATION;
    
    private String chiefComplaint;
    private String symptoms;
    private Double consultationFee;
    private String referredBy;
    private String notes;
    
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
    public enum VisitStatus {
        REGISTERED, WAITING, IN_CONSULTATION, COMPLETED, CANCELLED
    }
    
    public enum VisitType {
        CONSULTATION, FOLLOW_UP, EMERGENCY, ROUTINE_CHECKUP
    }
}