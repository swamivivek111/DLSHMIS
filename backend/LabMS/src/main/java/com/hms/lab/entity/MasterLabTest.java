package com.hms.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "master_lab_tests")
public class MasterLabTest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String category;
    
    @Column(name = "specimen_type")
    private String specimenType;
    
    @Column(name = "reference_range", columnDefinition = "JSON")
    private String referenceRange;
    
    @Column(name = "turnaround_time")
    private Integer turnaroundTime;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal price;
    
    @Column(nullable = false)
    private Boolean active = true;
}