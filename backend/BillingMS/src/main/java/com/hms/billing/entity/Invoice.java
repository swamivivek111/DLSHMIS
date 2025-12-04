package com.hms.billing.entity;

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
@Table(name = "invoices")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String invoiceNumber;
    
    @Column(nullable = false)
    private Long patientId;
    
    @Column(nullable = false)
    private String patientName;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal paidAmount;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal balanceAmount;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "due_date")
    private LocalDateTime dueDate;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) {
            status = PaymentStatus.PENDING;
        }
    }
    
    public enum PaymentStatus {
        PENDING, PARTIAL, PAID, OVERDUE
    }
}