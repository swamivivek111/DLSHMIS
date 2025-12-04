package com.hms.RadiologyMS.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "radiology_orders")
public class RadiologyOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    
    @Column(nullable = false)
    private Long patientId;
    
    @Column(nullable = false)
    private Long doctorId;
    
    @Column(nullable = false)
    private String testName;
    
    private String testCode;
    private String bodyPart;
    private String clinicalHistory;
    private String instructions;
    
    @Enumerated(EnumType.STRING)
    private OrderStatus status = OrderStatus.ORDERED;
    
    @Enumerated(EnumType.STRING)
    private Priority priority = Priority.NORMAL;
    
    @Column(nullable = false)
    private LocalDateTime orderDate = LocalDateTime.now();
    
    private LocalDateTime scheduledDate;
    private LocalDateTime completedDate;
    
    public enum OrderStatus {
        ORDERED, SCHEDULED, IN_PROGRESS, COMPLETED, CANCELLED
    }
    
    public enum Priority {
        LOW, NORMAL, HIGH, URGENT
    }
}