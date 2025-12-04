package com.hms.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuditService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @Value("${audit.service.url}")
    private String auditServiceUrl;
    
    public void logUserAction(String operation, String description, Long userId, String ipAddress) {
        logUserAction(operation, description, userId, null, null, ipAddress);
    }
    
    public void logUserAction(String operation, String description, Long userId, String userEmail, String userRole, String ipAddress) {
        try {
            Map<String, Object> auditLog = new HashMap<>();
            auditLog.put("operation", operation);
            auditLog.put("moduleName", "Authentication");
            auditLog.put("microservice", "UserMS");
            auditLog.put("userId", userId);
            auditLog.put("userEmail", userEmail);
            auditLog.put("userRole", userRole);
            auditLog.put("description", description);
            
            // Fix operationType mapping
            if (operation.contains("LOGIN")) {
                auditLog.put("operationType", "LOGIN");
            } else if (operation.contains("LOGOUT")) {
                auditLog.put("operationType", "LOGOUT");
            } else {
                auditLog.put("operationType", "CREATE");
            }
            
            auditLog.put("logLevel", operation.contains("FAILED") ? "ERROR" : "INFO");
            auditLog.put("status", operation.contains("FAILED") ? "FAILED" : "SUCCESS");
            auditLog.put("ipAddress", ipAddress);
            auditLog.put("timestamp", LocalDateTime.now());
            
            System.out.println("Sending audit log: " + auditLog);
            restTemplate.postForObject(auditServiceUrl + "/audit/log", auditLog, String.class);
            System.out.println("Audit log sent successfully");
        } catch (Exception e) {
            System.err.println("Failed to log audit: " + e.getMessage());
            e.printStackTrace();
        }
    }
}