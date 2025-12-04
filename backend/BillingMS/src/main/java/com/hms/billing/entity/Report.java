package com.hms.billing.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reportId;
    
    @Column(nullable = false)
    private String reportName;
    
    @Column(nullable = false)
    private String reportType; // DAILY, WEEKLY, MONTHLY, CUSTOM
    
    @Column(length = 2000)
    private String reportData; // JSON format
    
    private LocalDateTime fromDate;
    private LocalDateTime toDate;
    
    @Column(nullable = false)
    private LocalDateTime generatedAt = LocalDateTime.now();
    
    private String generatedBy;
    private String module; // BILLING, OPD, IPD, LAB, etc.
}