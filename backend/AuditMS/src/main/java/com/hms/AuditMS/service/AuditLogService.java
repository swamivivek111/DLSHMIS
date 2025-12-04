package com.hms.AuditMS.service;

import com.hms.AuditMS.entity.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public interface AuditLogService {
    void logTransaction(AuditLog auditLog);
    
    Page<AuditLog> getFilteredLogs(Pageable pageable, String operation, String moduleName, 
                                  String microservice, Long userId, String userEmail,
                                  AuditLog.LogLevel logLevel, AuditLog.OperationType operationType,
                                  String status, LocalDateTime startDate, LocalDateTime endDate);
    
    byte[] exportLogs(String operation, String moduleName, String microservice, Long userId, 
                     String userEmail, AuditLog.LogLevel logLevel, AuditLog.OperationType operationType,
                     String status, LocalDateTime startDate, LocalDateTime endDate, String format);
    
    Map<String, Object> getAuditStatistics(LocalDateTime startDate, LocalDateTime endDate);
    
    List<String> getDistinctOperations();
    List<String> getDistinctModules();
    List<String> getDistinctMicroservices();
    
    AuditLog getAuditLogById(Long id);
}