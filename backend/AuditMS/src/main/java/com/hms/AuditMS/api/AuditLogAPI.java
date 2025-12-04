package com.hms.AuditMS.api;

import com.hms.AuditMS.entity.AuditLog;
import com.hms.AuditMS.service.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/audit")
@CrossOrigin
public class AuditLogAPI {
    
    @Autowired
    private AuditLogService auditLogService;
    
    @GetMapping("/logs/{id}")
    public ResponseEntity<AuditLog> getAuditLogById(@PathVariable Long id) {
        AuditLog auditLog = auditLogService.getAuditLogById(id);
        return ResponseEntity.ok(auditLog);
    }
    
    @GetMapping("/logs")
    public ResponseEntity<Page<AuditLog>> getAuditLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "timestamp") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir,
            @RequestParam(required = false) String operation,
            @RequestParam(required = false) String moduleName,
            @RequestParam(required = false) String microservice,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String userEmail,
            @RequestParam(required = false) AuditLog.LogLevel logLevel,
            @RequestParam(required = false) AuditLog.OperationType operationType,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        
        Sort sort = Sort.by(sortDir.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC, sortBy);
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        
        Page<AuditLog> logs = auditLogService.getFilteredLogs(
            pageRequest, operation, moduleName, microservice, userId, userEmail,
            logLevel, operationType, status, startDate, endDate);
        
        return ResponseEntity.ok(logs);
    }
    
    @GetMapping("/logs/export")
    public ResponseEntity<byte[]> exportAuditLogs(
            @RequestParam(required = false) String operation,
            @RequestParam(required = false) String moduleName,
            @RequestParam(required = false) String microservice,
            @RequestParam(required = false) Long userId,
            @RequestParam(required = false) String userEmail,
            @RequestParam(required = false) AuditLog.LogLevel logLevel,
            @RequestParam(required = false) AuditLog.OperationType operationType,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(defaultValue = "csv") String format) {
        
        byte[] exportData = auditLogService.exportLogs(
            operation, moduleName, microservice, userId, userEmail,
            logLevel, operationType, status, startDate, endDate, format);
        
        String filename = "audit_logs_" + System.currentTimeMillis() + "." + format;
        
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(exportData);
    }
    
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getAuditStats(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        
        Map<String, Object> stats = auditLogService.getAuditStatistics(startDate, endDate);
        return ResponseEntity.ok(stats);
    }
    
    @GetMapping("/operations")
    public ResponseEntity<List<String>> getDistinctOperations() {
        return ResponseEntity.ok(auditLogService.getDistinctOperations());
    }
    
    @GetMapping("/modules")
    public ResponseEntity<List<String>> getDistinctModules() {
        return ResponseEntity.ok(auditLogService.getDistinctModules());
    }
    
    @GetMapping("/microservices")
    public ResponseEntity<List<String>> getDistinctMicroservices() {
        return ResponseEntity.ok(auditLogService.getDistinctMicroservices());
    }
}