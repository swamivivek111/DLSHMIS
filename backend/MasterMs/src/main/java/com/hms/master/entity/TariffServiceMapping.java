package com.hms.master.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tariff_service_mapping")
public class TariffServiceMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    
    @Column(name = "default_tariff_name", length = 50, nullable = false)
    private String defaultTariffName = "GENERAL / CASH";
    
    @Column(name = "company_tariff_category_id")
    private Long companyTariffCategoryId;
    
    @Column(name = "get_services", length = 20)
    private String getServices = "GET";
    
    @Column(name = "service_id", nullable = false)
    private Long serviceId;
    
    @Column(name = "service_name", length = 150)
    private String serviceName;
    
    @Column(name = "corporate_service_name", length = 150)
    private String corporateServiceName;
    
    @Column(name = "qty", length = 50)
    private String qty;
    
    @Column(name = "base_rate", precision = 10, scale = 2)
    private BigDecimal baseRate;
    
    @Column(name = "company_tariff_rate", precision = 10, scale = 2)
    private BigDecimal companyTariffRate;
    
    @Column(name = "discount_perc", precision = 5, scale = 2)
    private BigDecimal discountPerc;
    
    @Column(name = "discount_amount", precision = 10, scale = 2)
    private BigDecimal discountAmount;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    
    @Column(name = "created_by")
    private Long createdBy;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updated_by")
    private Long updatedBy;
    
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