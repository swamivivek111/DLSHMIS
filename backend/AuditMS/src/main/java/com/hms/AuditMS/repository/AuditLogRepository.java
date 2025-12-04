package com.hms.AuditMS.repository;

import com.hms.AuditMS.entity.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    
    @Query("SELECT a FROM AuditLog a WHERE " +
           "(:operation IS NULL OR a.operation = :operation) AND " +
           "(:moduleName IS NULL OR a.moduleName = :moduleName) AND " +
           "(:microservice IS NULL OR a.microservice = :microservice) AND " +
           "(:userId IS NULL OR a.userId = :userId) AND " +
           "(:userEmail IS NULL OR a.userEmail LIKE %:userEmail%) AND " +
           "(:logLevel IS NULL OR a.logLevel = :logLevel) AND " +
           "(:operationType IS NULL OR a.operationType = :operationType) AND " +
           "(:status IS NULL OR a.status = :status) AND " +
           "(:startDate IS NULL OR a.timestamp >= :startDate) AND " +
           "(:endDate IS NULL OR a.timestamp <= :endDate)")
    Page<AuditLog> findWithFilters(@Param("operation") String operation,
                                  @Param("moduleName") String moduleName,
                                  @Param("microservice") String microservice,
                                  @Param("userId") Long userId,
                                  @Param("userEmail") String userEmail,
                                  @Param("logLevel") AuditLog.LogLevel logLevel,
                                  @Param("operationType") AuditLog.OperationType operationType,
                                  @Param("status") String status,
                                  @Param("startDate") LocalDateTime startDate,
                                  @Param("endDate") LocalDateTime endDate,
                                  Pageable pageable);
    
    @Query("SELECT a FROM AuditLog a WHERE " +
           "(:operation IS NULL OR a.operation = :operation) AND " +
           "(:moduleName IS NULL OR a.moduleName = :moduleName) AND " +
           "(:microservice IS NULL OR a.microservice = :microservice) AND " +
           "(:userId IS NULL OR a.userId = :userId) AND " +
           "(:userEmail IS NULL OR a.userEmail LIKE %:userEmail%) AND " +
           "(:logLevel IS NULL OR a.logLevel = :logLevel) AND " +
           "(:operationType IS NULL OR a.operationType = :operationType) AND " +
           "(:status IS NULL OR a.status = :status) AND " +
           "(:startDate IS NULL OR a.timestamp >= :startDate) AND " +
           "(:endDate IS NULL OR a.timestamp <= :endDate) " +
           "ORDER BY a.timestamp DESC")
    List<AuditLog> findForExport(@Param("operation") String operation,
                                @Param("moduleName") String moduleName,
                                @Param("microservice") String microservice,
                                @Param("userId") Long userId,
                                @Param("userEmail") String userEmail,
                                @Param("logLevel") AuditLog.LogLevel logLevel,
                                @Param("operationType") AuditLog.OperationType operationType,
                                @Param("status") String status,
                                @Param("startDate") LocalDateTime startDate,
                                @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT COUNT(a) FROM AuditLog a WHERE " +
           "(:startDate IS NULL OR a.timestamp >= :startDate) AND " +
           "(:endDate IS NULL OR a.timestamp <= :endDate)")
    Long countByDateRange(@Param("startDate") LocalDateTime startDate,
                         @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT a.operationType, COUNT(a) FROM AuditLog a WHERE " +
           "(:startDate IS NULL OR a.timestamp >= :startDate) AND " +
           "(:endDate IS NULL OR a.timestamp <= :endDate) " +
           "GROUP BY a.operationType")
    List<Object[]> countByOperationType(@Param("startDate") LocalDateTime startDate,
                                       @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT a.moduleName, COUNT(a) FROM AuditLog a WHERE " +
           "(:startDate IS NULL OR a.timestamp >= :startDate) AND " +
           "(:endDate IS NULL OR a.timestamp <= :endDate) " +
           "GROUP BY a.moduleName")
    List<Object[]> countByModule(@Param("startDate") LocalDateTime startDate,
                                @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT a.logLevel, COUNT(a) FROM AuditLog a WHERE " +
           "(:startDate IS NULL OR a.timestamp >= :startDate) AND " +
           "(:endDate IS NULL OR a.timestamp <= :endDate) " +
           "GROUP BY a.logLevel")
    List<Object[]> countByLogLevel(@Param("startDate") LocalDateTime startDate,
                                  @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT DISTINCT a.operation FROM AuditLog a ORDER BY a.operation")
    List<String> findDistinctOperations();
    
    @Query("SELECT DISTINCT a.moduleName FROM AuditLog a ORDER BY a.moduleName")
    List<String> findDistinctModules();
    
    @Query("SELECT DISTINCT a.microservice FROM AuditLog a ORDER BY a.microservice")
    List<String> findDistinctMicroservices();
}