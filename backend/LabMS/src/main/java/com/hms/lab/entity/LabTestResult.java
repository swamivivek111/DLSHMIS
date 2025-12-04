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
@Table(name = "lab_test_results")
public class LabTestResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_item_id")
    private LabOrderItem orderItem;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sample_id")
    private LabSample sample;
    
    @Column(name = "result_data", columnDefinition = "JSON")
    private String resultData;
    
    @Column(columnDefinition = "TEXT")
    private String comments;
    
    @Column(name = "technician_id")
    private Long technicianId;
    
    @Column(name = "validator_id")
    private Long validatorId;
    
    @Column(nullable = false)
    private Boolean validated = false;
    
    @Column(name = "validation_time")
    private LocalDateTime validationTime;
    
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
}