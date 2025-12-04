package com.hms.AuditMS.api;

import com.hms.AuditMS.entity.AuditLog;
import com.hms.AuditMS.service.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/audit")
@CrossOrigin
public class AuditLogController {
    
    @Autowired
    private AuditLogService auditLogService;
    
    @PostMapping("/log")
    public ResponseEntity<String> logTransaction(@RequestBody AuditLog auditLog) {
        System.out.println("Received audit log: " + auditLog);
        auditLogService.logTransaction(auditLog);
        System.out.println("Audit log saved successfully");
        return ResponseEntity.ok("Audit log created successfully");
    }
    
    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("AuditMS is running");
    }
    
    @PostMapping("/test-logout")
    public ResponseEntity<String> testLogout() {
        AuditLog testLog = new AuditLog();
        testLog.setOperation("TEST_USER_LOGOUT");
        testLog.setModuleName("Authentication");
        testLog.setMicroservice("UserMS");
        testLog.setUserId(999L);
        testLog.setUserEmail("test@logout.com");
        testLog.setUserRole("ADMIN");
        testLog.setDescription("Test logout audit entry");
        testLog.setOperationType(AuditLog.OperationType.LOGOUT);
        testLog.setLogLevel(AuditLog.LogLevel.INFO);
        testLog.setStatus("SUCCESS");
        testLog.setIpAddress("127.0.0.1");
        
        auditLogService.logTransaction(testLog);
        return ResponseEntity.ok("Test logout audit created with ID: " + testLog.getId());
    }
}