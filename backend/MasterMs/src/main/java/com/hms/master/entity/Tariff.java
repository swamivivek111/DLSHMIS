package com.hms.master.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
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
    
    @Column(name = "service_name", nullable = false)
    private String serviceName;
    
    @Column(name = "service_code")
    private String serviceCode;
    
    @Column(name = "description")
    private String description;
    
    @Column(name = "base_price", nullable = false)
    private BigDecimal basePrice;
    
    @Column(name = "discount_price")
    private BigDecimal discountPrice;
    
    @Column(name = "service_category", nullable = false)
    private String serviceCategory;
    
    @Column(name = "department", nullable = false)
    private String department;
    
    @Column(name = "unit", nullable = false)
    private String unit;
    
    @Column(name = "tax_percentage")
    private BigDecimal taxPercentage;
    
    @Column(name = "effective_from")
    private LocalDateTime effectiveFrom;
    
    @Column(name = "effective_to")
    private LocalDateTime effectiveTo;
    
    @Column(name = "is_active", nullable = false)
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
        if (isActive == null) {
            isActive = true;
        }
    }
    
    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}