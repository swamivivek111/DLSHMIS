package com.hms.master.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.hms.master.dto.CompanyDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "company_id")
    private Long companyId;
    
    @Column(name = "company_code")
    private String companyCode;
    
    @Column(name = "company_name")
    private String companyName;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "company_type")
    private CompanyType companyType;
    
    private String address;
    private String email;
    private String phone;
    
    @Column(name = "effective_from")
    private LocalDate effectiveFrom;
    
    @Column(name = "effective_to")
    private LocalDate effectiveTo;
    
    @Column(name = "org_percentage")
    private String orgPercentage;
    
    @Column(name = "emp_percentage")
    private String empPercentage;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public enum CompanyType {
        Corporate, Insurance, TPA
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public CompanyDTO toDTO() {
        return new CompanyDTO(companyId, companyCode, companyName, companyType, address, email, phone, 
                            effectiveFrom, effectiveTo, orgPercentage, empPercentage, isActive, createdAt, updatedAt);
    }
}