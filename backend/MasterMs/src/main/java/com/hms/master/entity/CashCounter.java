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
@Table(name = "cash_counters")
public class CashCounter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cash_counter_id")
    private Long cashCounterId;
    
    @Column(name = "counter_name", nullable = false, length = 150)
    private String counterName;
    
    @Column(name = "description", length = 150)
    private String description;
    
    @Column(name = "system_name", length = 150)
    private String systemName;
    
    @Column(name = "token_required", nullable = false)
    private Boolean tokenRequired = false;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "counter_type", nullable = false)
    private CounterType counterType;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    public void prePersist() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (tokenRequired == null) {
            tokenRequired = false;
        }
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
    
    public enum CounterType {
        OPD_BILLING, IPD_BILLING, RECEPTION, OPD_PHARMACY, PATHOLOGY, RADIOLOGY
    }
}