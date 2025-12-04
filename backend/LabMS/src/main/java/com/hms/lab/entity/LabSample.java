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
@Table(name = "lab_samples")
public class LabSample {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_item_id")
    private LabOrderItem orderItem;
    
    @Column(unique = true, nullable = false)
    private String barcode;
    
    @Column(name = "sample_type")
    private String sampleType;
    
    private String container;
    
    @Column(name = "collected_by")
    private Long collectedBy;
    
    @Column(name = "collection_datetime")
    private LocalDateTime collectionDatetime;
    
    @Enumerated(EnumType.STRING)
    private SampleStatus status;
    
    @Column(name = "rejection_reason")
    private String rejectionReason;
    
    @PrePersist
    protected void onCreate() {
        if (status == null) {
            status = SampleStatus.PENDING;
        }
    }
    
    public enum SampleStatus {
        PENDING, COLLECTED, REJECTED
    }
}