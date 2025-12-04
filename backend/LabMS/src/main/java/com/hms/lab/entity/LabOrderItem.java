package com.hms.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "lab_order_items")
public class LabOrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private LabOrder labOrder;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_id")
    private MasterLabTest test;
    
    @Column(name = "sample_type")
    private String sampleType;
    
    @Enumerated(EnumType.STRING)
    private ItemStatus status;
    
    @Column(name = "expected_time")
    private LocalDateTime expectedTime;
    
    @OneToOne(mappedBy = "orderItem", cascade = CascadeType.ALL)
    private LabTestResult result;
    
    @PrePersist
    protected void onCreate() {
        if (status == null) {
            status = ItemStatus.PENDING;
        }
    }
    
    public enum ItemStatus {
        PENDING, COLLECTED, PROCESSING, VALIDATED, REPORTED
    }
}