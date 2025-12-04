package com.hms.inventory.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "medicines")
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String medicineName;
    
    @Column(nullable = false)
    private String batchNumber;
    
    @Column(nullable = false)
    private String manufacturer;
    
    @Column(nullable = false)
    private Integer quantity;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;
    
    @Column(name = "expiry_date")
    private LocalDate expiryDate;
    
    @Column(name = "manufacture_date")
    private LocalDate manufactureDate;
    
    @Enumerated(EnumType.STRING)
    private MedicineStatus status;
    
    public enum MedicineStatus {
        AVAILABLE, OUT_OF_STOCK, EXPIRED
    }
}