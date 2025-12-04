package com.hms.notification.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;
    
    @Column(nullable = false)
    private Long userId;
    
    @Column(nullable = false)
    private String title;
    
    @Column(length = 1000)
    private String message;
    
    @Enumerated(EnumType.STRING)
    private NotificationType type = NotificationType.INFO;
    
    @Enumerated(EnumType.STRING)
    private Priority priority = Priority.NORMAL;
    
    private String module; // OPD, IPD, LAB, etc.
    private Long referenceId; // Visit ID, Order ID, etc.
    
    @Column(nullable = false)
    private Boolean isRead = false;
    
    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime readAt;
    
    public enum NotificationType {
        INFO, WARNING, ERROR, SUCCESS, REMINDER
    }
    
    public enum Priority {
        LOW, NORMAL, HIGH, URGENT
    }
}