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
@Table(name = "category_tariff_mapping")
public class CategoryTariffMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mapping_id")
    private Long mappingId;
    
    @Column(name = "category_id", nullable = false)
    private Long categoryId;
    
    @Column(name = "tariff_id", nullable = false)
    private Long tariffId;
    
    @Column(name = "effective_from", nullable = false)
    private LocalDate effectiveFrom;
    
    @Column(name = "effective_to")
    private LocalDate effectiveTo;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (isActive == null) {
            isActive = true;
        }
    }
}