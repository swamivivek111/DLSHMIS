package com.hms.AuditMS.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "audit_logs")
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "audit_id")
    private Long id;
    
    @Column(nullable = false)
    private String operation;
    
    @Column(nullable = false)
    private String moduleName;
    
    @Column(nullable = false)
    private String microservice;
    
    private Long userId;
    private String userEmail;
    private String userRole;
    
    @Column(length = 1000)
    private String description;
    
    @Enumerated(EnumType.STRING)
    private LogLevel logLevel = LogLevel.INFO;
    
    @Enumerated(EnumType.STRING)
    private OperationType operationType;
    
    private String entityType;
    private Long entityId;
    private String ipAddress;
    private String userAgent;
    
    @Column(length = 2000)
    private String requestData;
    
    @Column(length = 2000)
    private String responseData;
    
    private String status = "SUCCESS";
    private String errorMessage;
    
    @Column(nullable = false, name = "created_at")
    private LocalDateTime timestamp = LocalDateTime.now();
    
    public enum LogLevel {
        DEBUG, INFO, WARN, ERROR, CRITICAL
    }
    
    public enum OperationType {
        // Authentication
        LOGIN, LOGOUT, REGISTER, PASSWORD_RESET,
        
        // CRUD Operations
        CREATE, READ, UPDATE, DELETE,
        
        // Medical Operations
        APPOINTMENT_BOOK, APPOINTMENT_CANCEL, CONSULTATION,
        ADMISSION, DISCHARGE, PRESCRIPTION, LAB_ORDER, RADIOLOGY_ORDER,
        
        // Financial
        BILLING, PAYMENT, INVOICE,
        
        // System Operations
        NOTIFICATION, REPORT_GENERATE, DATA_EXPORT, BACKUP,
        
        // Administrative
        USER_MANAGEMENT, ROLE_ASSIGNMENT, SYSTEM_CONFIG
    }
}