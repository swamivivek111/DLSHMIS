package com.hms.AuditMS.config;

import com.hms.AuditMS.entity.AuditLog;
import com.hms.AuditMS.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Component
public class AuditDataInitializer implements CommandLineRunner {

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Override
    public void run(String... args) throws Exception {
        // Create some historical audit logs if table is empty
        if (auditLogRepository.count() == 0) {
            createHistoricalAuditLogs();
        }
        System.out.println("AuditMS started - Ready to capture real audit logs");
    }

    private void createDummyAuditLogs() {
        List<AuditLog> auditLogs = Arrays.asList(
            // Recent login/logout activities (will appear at top due to recent timestamps)
            createAuditLogWithTime("USER_LOGIN", "Authentication", "UserMS", 1L, "admin@hms.com", "ADMIN", AuditLog.OperationType.LOGIN, AuditLog.LogLevel.INFO, "Admin user logged in successfully", "SUCCESS", 0),
            createAuditLogWithTime("USER_LOGIN", "Authentication", "UserMS", 2L, "doctor@hms.com", "DOCTOR", AuditLog.OperationType.LOGIN, AuditLog.LogLevel.INFO, "Doctor user logged in successfully", "SUCCESS", 1),
            createAuditLogWithTime("USER_LOGIN", "Authentication", "UserMS", 3L, "patient@hms.com", "PATIENT", AuditLog.OperationType.LOGIN, AuditLog.LogLevel.INFO, "Patient user logged in successfully", "SUCCESS", 2),
            createAuditLogWithTime("USER_LOGOUT", "Authentication", "UserMS", 3L, "patient@hms.com", "PATIENT", AuditLog.OperationType.LOGOUT, AuditLog.LogLevel.INFO, "Patient user logged out", "SUCCESS", 3),
            createAuditLogWithTime("USER_LOGOUT", "Authentication", "UserMS", 2L, "doctor@hms.com", "DOCTOR", AuditLog.OperationType.LOGOUT, AuditLog.LogLevel.INFO, "Doctor user logged out", "SUCCESS", 4),
            // Other activities
            createAuditLog("PATIENT_CREATE", "Patient Management", "ProfileMs", 1L, "admin@hms.com", "ADMIN", AuditLog.OperationType.CREATE, AuditLog.LogLevel.INFO, "New patient created", "SUCCESS"),
            createAuditLog("DOCTOR_UPDATE", "Doctor Management", "ProfileMs", 1L, "admin@hms.com", "ADMIN", AuditLog.OperationType.UPDATE, AuditLog.LogLevel.INFO, "Doctor profile updated", "SUCCESS"),
            createAuditLog("APPOINTMENT_BOOK", "Appointment", "AppointmentMS", 2L, "patient@hms.com", "PATIENT", AuditLog.OperationType.APPOINTMENT_BOOK, AuditLog.LogLevel.INFO, "Appointment booked successfully", "SUCCESS"),
            createAuditLog("DEPARTMENT_CREATE", "Master Data", "MasterMs", 1L, "admin@hms.com", "ADMIN", AuditLog.OperationType.CREATE, AuditLog.LogLevel.INFO, "New department created", "SUCCESS"),
            createAuditLog("SYSTEM_ERROR", "System", "GatewayMS", null, "system", "SYSTEM", AuditLog.OperationType.READ, AuditLog.LogLevel.ERROR, "Database connection failed", "FAILED")
        );

        auditLogRepository.saveAll(auditLogs);
        System.out.println("Created " + auditLogs.size() + " dummy audit logs");
    }

    private AuditLog createAuditLog(String operation, String moduleName, String microservice, Long userId, 
                                   String userEmail, String userRole, AuditLog.OperationType operationType, 
                                   AuditLog.LogLevel logLevel, String description, String status) {
        AuditLog log = new AuditLog();
        log.setOperation(operation);
        log.setModuleName(moduleName);
        log.setMicroservice(microservice);
        log.setUserId(userId);
        log.setUserEmail(userEmail);
        log.setUserRole(userRole);
        log.setOperationType(operationType);
        log.setLogLevel(logLevel);
        log.setDescription(description);
        log.setStatus(status);
        log.setTimestamp(LocalDateTime.now().minusHours((long) (Math.random() * 24)));
        log.setIpAddress("192.168.1." + (int)(Math.random() * 255));
        return log;
    }
    
    private AuditLog createAuditLogWithTime(String operation, String moduleName, String microservice, Long userId, 
                                           String userEmail, String userRole, AuditLog.OperationType operationType, 
                                           AuditLog.LogLevel logLevel, String description, String status, int minutesAgo) {
        AuditLog log = new AuditLog();
        log.setOperation(operation);
        log.setModuleName(moduleName);
        log.setMicroservice(microservice);
        log.setUserId(userId);
        log.setUserEmail(userEmail);
        log.setUserRole(userRole);
        log.setOperationType(operationType);
        log.setLogLevel(logLevel);
        log.setDescription(description);
        log.setStatus(status);
        log.setTimestamp(LocalDateTime.now().minusMinutes(minutesAgo));
        log.setIpAddress("192.168.1." + (int)(Math.random() * 255));
        return log;
    }
    
    private void createHistoricalAuditLogs() {
        List<AuditLog> historicalLogs = Arrays.asList(
            // Historical login/logout activities from past days
            createAuditLogWithTime("USER_LOGIN", "Authentication", "UserMS", 1L, "admin@hms.com", "ADMIN", AuditLog.OperationType.LOGIN, AuditLog.LogLevel.INFO, "Admin user logged in successfully", "SUCCESS", 2880), // 2 days ago
            createAuditLogWithTime("USER_LOGOUT", "Authentication", "UserMS", 1L, "admin@hms.com", "ADMIN", AuditLog.OperationType.LOGOUT, AuditLog.LogLevel.INFO, "Admin user logged out", "SUCCESS", 2820), // 2 days ago
            createAuditLogWithTime("USER_LOGIN", "Authentication", "UserMS", 2L, "doctor@hms.com", "DOCTOR", AuditLog.OperationType.LOGIN, AuditLog.LogLevel.INFO, "Doctor user logged in successfully", "SUCCESS", 1440), // 1 day ago
            createAuditLogWithTime("USER_LOGOUT", "Authentication", "UserMS", 2L, "doctor@hms.com", "DOCTOR", AuditLog.OperationType.LOGOUT, AuditLog.LogLevel.INFO, "Doctor user logged out", "SUCCESS", 1380), // 1 day ago
            createAuditLogWithTime("USER_LOGIN", "Authentication", "UserMS", 3L, "patient@hms.com", "PATIENT", AuditLog.OperationType.LOGIN, AuditLog.LogLevel.INFO, "Patient user logged in successfully", "SUCCESS", 720), // 12 hours ago
            createAuditLogWithTime("USER_LOGOUT", "Authentication", "UserMS", 3L, "patient@hms.com", "PATIENT", AuditLog.OperationType.LOGOUT, AuditLog.LogLevel.INFO, "Patient user logged out", "SUCCESS", 660), // 11 hours ago
            createAuditLogWithTime("USER_LOGIN", "Authentication", "UserMS", 1L, "admin@hms.com", "ADMIN", AuditLog.OperationType.LOGIN, AuditLog.LogLevel.INFO, "Admin user logged in successfully", "SUCCESS", 480), // 8 hours ago
            createAuditLogWithTime("USER_LOGOUT", "Authentication", "UserMS", 1L, "admin@hms.com", "ADMIN", AuditLog.OperationType.LOGOUT, AuditLog.LogLevel.INFO, "Admin user logged out", "SUCCESS", 420), // 7 hours ago
            createAuditLogWithTime("USER_LOGIN", "Authentication", "UserMS", 2L, "doctor@hms.com", "DOCTOR", AuditLog.OperationType.LOGIN, AuditLog.LogLevel.INFO, "Doctor user logged in successfully", "SUCCESS", 240), // 4 hours ago
            createAuditLogWithTime("USER_LOGIN", "Authentication", "UserMS", 1L, "admin@hms.com", "ADMIN", AuditLog.OperationType.LOGIN, AuditLog.LogLevel.INFO, "Admin user logged in successfully", "SUCCESS", 60) // 1 hour ago
        );
        
        auditLogRepository.saveAll(historicalLogs);
        System.out.println("Created " + historicalLogs.size() + " historical audit logs");
    }
}