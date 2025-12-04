package com.hms.AuditMS.service;

import com.hms.AuditMS.entity.AuditLog;
import com.hms.AuditMS.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AuditLogServiceImpl implements AuditLogService {
    
    @Autowired
    private AuditLogRepository auditLogRepository;
    
    @Override
    public void logTransaction(AuditLog auditLog) {
        auditLogRepository.save(auditLog);
    }
    
    @Override
    public Page<AuditLog> getFilteredLogs(Pageable pageable, String operation, String moduleName,
                                         String microservice, Long userId, String userEmail,
                                         AuditLog.LogLevel logLevel, AuditLog.OperationType operationType,
                                         String status, LocalDateTime startDate, LocalDateTime endDate) {
        
        return auditLogRepository.findWithFilters(operation, moduleName, microservice, userId, 
                                                 userEmail, logLevel, operationType, status, 
                                                 startDate, endDate, pageable);
    }
    
    @Override
    public byte[] exportLogs(String operation, String moduleName, String microservice, Long userId,
                            String userEmail, AuditLog.LogLevel logLevel, AuditLog.OperationType operationType,
                            String status, LocalDateTime startDate, LocalDateTime endDate, String format) {
        
        List<AuditLog> logs = auditLogRepository.findForExport(operation, moduleName, microservice, 
                                                              userId, userEmail, logLevel, operationType, 
                                                              status, startDate, endDate);
        
        if ("csv".equalsIgnoreCase(format)) {
            return generateCSV(logs);
        }
        return generateCSV(logs); // Default to CSV
    }
    
    private byte[] generateCSV(List<AuditLog> logs) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
             PrintWriter writer = new PrintWriter(baos)) {
            
            // CSV Header
            writer.println("ID,Timestamp,Operation,Module,Microservice,User ID,User Email,User Role," +
                          "Operation Type,Log Level,Entity Type,Entity ID,Status,Description,IP Address");
            
            // CSV Data
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            for (AuditLog log : logs) {
                writer.printf("%d,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,\"%s\",%s%n",
                    log.getId(),
                    log.getTimestamp().format(formatter),
                    escapeCSV(log.getOperation()),
                    escapeCSV(log.getModuleName()),
                    escapeCSV(log.getMicroservice()),
                    log.getUserId(),
                    escapeCSV(log.getUserEmail()),
                    escapeCSV(log.getUserRole()),
                    log.getOperationType(),
                    log.getLogLevel(),
                    escapeCSV(log.getEntityType()),
                    log.getEntityId(),
                    escapeCSV(log.getStatus()),
                    escapeCSV(log.getDescription()),
                    escapeCSV(log.getIpAddress())
                );
            }
            
            writer.flush();
            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error generating CSV", e);
        }
    }
    
    private String escapeCSV(String value) {
        if (value == null) return "";
        return value.replace("\"", "\"\"");
    }
    
    @Override
    public Map<String, Object> getAuditStatistics(LocalDateTime startDate, LocalDateTime endDate) {
        Map<String, Object> stats = new HashMap<>();
        
        // Total logs count
        Long totalLogs = auditLogRepository.countByDateRange(startDate, endDate);
        stats.put("totalLogs", totalLogs);
        
        // Logs by operation type
        List<Object[]> operationStats = auditLogRepository.countByOperationType(startDate, endDate);
        Map<String, Long> operationCounts = operationStats.stream()
            .collect(Collectors.toMap(
                row -> row[0].toString(),
                row -> (Long) row[1]
            ));
        stats.put("operationTypeCounts", operationCounts);
        
        // Logs by module
        List<Object[]> moduleStats = auditLogRepository.countByModule(startDate, endDate);
        Map<String, Long> moduleCounts = moduleStats.stream()
            .collect(Collectors.toMap(
                row -> row[0].toString(),
                row -> (Long) row[1]
            ));
        stats.put("moduleCounts", moduleCounts);
        
        // Logs by log level
        List<Object[]> levelStats = auditLogRepository.countByLogLevel(startDate, endDate);
        Map<String, Long> levelCounts = levelStats.stream()
            .collect(Collectors.toMap(
                row -> row[0].toString(),
                row -> (Long) row[1]
            ));
        stats.put("logLevelCounts", levelCounts);
        
        // Recent activity (last 24 hours)
        LocalDateTime last24Hours = LocalDateTime.now().minusHours(24);
        Long recentActivity = auditLogRepository.countByDateRange(last24Hours, null);
        stats.put("recentActivity", recentActivity);
        
        return stats;
    }
    
    @Override
    public List<String> getDistinctOperations() {
        return auditLogRepository.findDistinctOperations();
    }
    
    @Override
    public List<String> getDistinctModules() {
        return auditLogRepository.findDistinctModules();
    }
    
    @Override
    public List<String> getDistinctMicroservices() {
        return auditLogRepository.findDistinctMicroservices();
    }
    
    @Override
    public AuditLog getAuditLogById(Long id) {
        return auditLogRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Audit log not found with id: " + id));
    }
}