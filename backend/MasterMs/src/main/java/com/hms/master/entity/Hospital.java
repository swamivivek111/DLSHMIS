package com.hms.master.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "hospitals")
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hospitalId;
    
    @Column(nullable = false, unique = true)
    private String hospitalCode;
    
    @Column(nullable = false)
    private String hospitalName;
    
    private String hospitalType; // Government, Private, Trust
    
    @Column(length = 1000)
    private String address;
    
    private String city;
    private String state;
    private String country;
    private String pincode;
    
    private String phoneNumber;
    private String emailId;
    private String website;
    
    private String licenseNumber;
    private String registrationNumber;
    
    private Integer totalBeds;
    private Integer icuBeds;
    private Integer emergencyBeds;
    
    private String establishedYear;
    private String accreditation; // NABH, JCI, etc.
    
    @Column(length = 2000)
    private String specialties;
    
    @Column(length = 1000)
    private String description;
    
    private String logoUrl;
    
    @Column(nullable = false)
    private Boolean active = true;
    
    private String createdBy;
    private String updatedBy;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}