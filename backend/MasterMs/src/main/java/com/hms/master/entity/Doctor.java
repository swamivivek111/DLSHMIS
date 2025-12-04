package com.hms.master.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorId;
    
    private String code;
    private String type;
    private String name;
    private String specialization;
    private Long departmentId;
    private String qualification;
    private String emailId;
    private String contactNumber;
    private String firstConsultationFees;
    private String followUpFees;
    private LocalDate joiningDate;
    private String panno;
    private String address;
    private Long cityId;
    private Long districtId;
    private String doctorShare;
    private String createdBy;
    private Long hospitalId;
    private Boolean active = true;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}