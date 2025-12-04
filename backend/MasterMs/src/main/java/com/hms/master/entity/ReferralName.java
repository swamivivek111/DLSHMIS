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
@Table(name = "referral_name_master")
public class ReferralName {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "referral_name_id")
    private Long referralNameId;
    
    @Column(name = "referral_type_id", nullable = false)
    private Long referralTypeId;
    
    @Column(name = "referral_name", length = 150, nullable = false)
    private String referralName;
    
    @Column(name = "referral_address", length = 250)
    private String referralAddress;
    
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