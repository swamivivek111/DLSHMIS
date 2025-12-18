package com.hms.master.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tariffs")
public class Tariff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tariff_id")
    private Long tariffId;
    
    @Column(name = "tariff_name", nullable = false)
    private String tariffName;
    
    @Column(name = "tariff_code", unique = true)
    private String tariffCode;
    
    @Column(name = "description")
    private String description;
    
    @Column(name = "service_category")
    private String serviceCategory;
    
    @Column(name = "service_name")
    private String serviceName;
    
    @Column(name = "department")
    private String department;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
    
    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}