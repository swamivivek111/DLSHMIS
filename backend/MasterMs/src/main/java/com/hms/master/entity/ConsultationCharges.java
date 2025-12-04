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
@Table(name = "consultation_charges")
public class ConsultationCharges {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    
    @Column(name = "tariff_id", nullable = false)
    private Long tariffId;
    
    @Column(name = "department_id", nullable = false)
    private Long departmentId;
    
    @Column(name = "doctor_id", nullable = false)
    private Long doctorId;
    
    @Column(name = "created_by")
    private Long createdBy;
    
    @Column(name = "created_date", nullable = false)
    private LocalDateTime createdDate = LocalDateTime.now();
    
    @Column(name = "modified_by")
    private Long modifiedBy;
    
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;
    
    @Column(name = "opd_visit_type", length = 50)
    private String opdVisitType;
    
    @Column(name = "validation_days")
    private BigDecimal validationDays;
    
    @Column(name = "no_of_visits")
    private BigDecimal noOfVisits;
    
    @Column(name = "normal_visits")
    private BigDecimal normalVisits;
    
    @Column(name = "free_visits")
    private BigDecimal freeVisits;
    
    @Column(name = "paid_visits")
    private BigDecimal paidVisits;
    
    @Column(name = "fee", precision = 10, scale = 2)
    private BigDecimal fee;
    
    @Column(name = "hospital_share_percent", precision = 5, scale = 2)
    private BigDecimal hospitalSharePercent;
    
    @Column(name = "hospital_share_amount", precision = 10, scale = 2)
    private BigDecimal hospitalShareAmount;
    
    @Column(name = "doctor_share_percent", precision = 5, scale = 2)
    private BigDecimal doctorSharePercent;
    
    @Column(name = "doctor_share_amount", precision = 10, scale = 2)
    private BigDecimal doctorShareAmount;
    
    @Column(name = "deluxe_fee")
    private BigDecimal deluxeFee;
    
    @Column(name = "deluxe_percent")
    private BigDecimal deluxePercent;
    
    @Column(name = "deluxe_price")
    private BigDecimal deluxePrice;
    
    @Column(name = "suite_fee")
    private BigDecimal suiteFee;
    
    @Column(name = "suite_percent")
    private BigDecimal suitePercent;
    
    @Column(name = "suite_price")
    private BigDecimal suitePrice;
    
    @Column(name = "pvt_icu_fee")
    private BigDecimal pvtIcuFee;
    
    @Column(name = "pvt_icu_percent")
    private BigDecimal pvtIcuPercent;
    
    @Column(name = "pvt_icu_price")
    private BigDecimal pvtIcuPrice;
    
    @Column(name = "single_room_fee")
    private BigDecimal singleRoomFee;
    
    @Column(name = "single_room_percent")
    private BigDecimal singleRoomPercent;
    
    @Column(name = "single_room_price")
    private BigDecimal singleRoomPrice;
    
    @PrePersist
    public void prePersist() {
        if (createdDate == null) {
            createdDate = LocalDateTime.now();
        }
    }
    
    @PreUpdate
    public void preUpdate() {
        modifiedDate = LocalDateTime.now();
    }
}