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
@Table(name = "service_master")
public class ServiceMaster {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tariff_id")
    private Long tariffId;
    
    @Column(name = "service_name", length = 150, nullable = false)
    private String serviceName;
    
    @Column(name = "display_name", length = 150)
    private String displayName;
    
    @Column(name = "service_group_id")
    private Long serviceGroupId;
    
    @Column(name = "service_sub_group_id")
    private Long serviceSubGroupId;
    
    @Column(name = "service_class_id")
    private Long serviceClassId;
    
    @Column(name = "service_type", length = 50)
    private String serviceType;
    
    @Column(name = "applicable_for", length = 50)
    private String applicableFor;
    
    @Column(name = "billing_process", length = 50)
    private String billingProcess;
    
    @Column(name = "billing_head_id")
    private Long billingHeadId;
    
    @Column(name = "effect_from")
    private LocalDate effectFrom;
    
    @Column(name = "effect_to")
    private LocalDate effectTo;
    
    // OPD Pricing
    @Column(name = "opd_service_price", precision = 10, scale = 2)
    private BigDecimal opdServicePrice;
    
    @Column(name = "opd_emergency_price", precision = 10, scale = 2)
    private BigDecimal opdEmergencyPrice;
    
    @Column(name = "opd_hospital_share_pct", precision = 5, scale = 2)
    private BigDecimal opdHospitalSharePct;
    
    @Column(name = "opd_hospital_price", precision = 10, scale = 2)
    private BigDecimal opdHospitalPrice;
    
    @Column(name = "opd_hospital_emergency_price", precision = 10, scale = 2)
    private BigDecimal opdHospitalEmergencyPrice;
    
    @Column(name = "opd_doctor_price", precision = 10, scale = 2)
    private BigDecimal opdDoctorPrice;
    
    @Column(name = "opd_doctor_share_pct", precision = 5, scale = 2)
    private BigDecimal opdDoctorSharePct;
    
    // IPD Pricing
    @Column(name = "ward_group_name_id")
    private Long wardGroupNameId;
    
    @Column(name = "ipd_normal_price", precision = 10, scale = 2)
    private BigDecimal ipdNormalPrice;
    
    @Column(name = "ipd_doctor_share_price", precision = 10, scale = 2)
    private BigDecimal ipdDoctorSharePrice;
    
    @Column(name = "ipd_emergency_price", precision = 10, scale = 2)
    private BigDecimal ipdEmergencyPrice;
    
    @Column(name = "ipd_doctor_share", precision = 5, scale = 2)
    private BigDecimal ipdDoctorShare;
    
    // Additional Information
    @Column(name = "universal_code", length = 50)
    private String universalCode;
    
    @Column(name = "is_having_universal_code")
    private Boolean isHavingUniversalCode = false;
    
    @Column(name = "min_amt", precision = 10, scale = 2)
    private BigDecimal minAmt;
    
    @Column(name = "max_amt", precision = 10, scale = 2)
    private BigDecimal maxAmt;
    
    @Column(name = "is_price_caps")
    private Boolean isPriceCaps = false;
    
    // Tax Information
    @Column(name = "tax_id")
    private Long taxId;
    
    @Column(name = "tax_percentage", precision = 5, scale = 2)
    private BigDecimal taxPercentage;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    // Options
    @Column(name = "is_qty_editable")
    private Boolean isQtyEditable = false;
    
    @Column(name = "is_diet")
    private Boolean isDiet = false;
    
    @Column(name = "is_non_consumable_required")
    private Boolean isNonConsumableRequired = false;
    
    @Column(name = "is_normal_service_charges")
    private Boolean isNormalServiceCharges = false;
    
    @Column(name = "is_price_editable")
    private Boolean isPriceEditable = false;
    
    @Column(name = "is_emergency_service_charges")
    private Boolean isEmergencyServiceCharges = false;
    
    @Column(name = "is_doctor_required")
    private Boolean isDoctorRequired = false;
    
    @Column(name = "is_treatment_room")
    private Boolean isTreatmentRoom = false;
    
    @Column(name = "is_doctor_share_required")
    private Boolean isDoctorShareRequired = false;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private Status status = Status.Active;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum Status {
        Active, Inactive
    }
    
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