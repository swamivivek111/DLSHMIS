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
@Table(name = "lab_reports")
public class LabReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private LabOrder labOrder;
    
    @Column(name = "report_pdf")
    private String reportPdf;
    
    @Column(name = "generated_by")
    private Long generatedBy;
    
    @Column(name = "generated_at")
    private LocalDateTime generatedAt;
    
    @Column(name = "verified_url")
    private String verifiedUrl;
    
    @PrePersist
    protected void onCreate() {
        generatedAt = LocalDateTime.now();
    }
}