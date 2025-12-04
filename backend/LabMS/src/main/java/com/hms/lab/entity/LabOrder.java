package com.hms.lab.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "lab_orders")
public class LabOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private Long patientId;
    
    @Column(nullable = false)
    private String patientName;
    
    @Column(nullable = false)
    private Long doctorId;
    
    @Column(nullable = false)
    private String doctorName;
    
    @Column(name = "order_date")
    private LocalDateTime orderDate;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    @OneToMany(mappedBy = "labOrder", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<LabOrderItem> orderItems;
    
    @PrePersist
    protected void onCreate() {
        orderDate = LocalDateTime.now();
        if (status == null) {
            status = OrderStatus.PENDING;
        }
        if (priority == null) {
            priority = Priority.ROUTINE;
        }
    }
    
    public enum OrderStatus {
        PENDING, SAMPLE_COLLECTED, PROCESSING, COMPLETED, CANCELLED
    }
    
    public enum Priority {
        ROUTINE, URGENT, STAT
    }
}