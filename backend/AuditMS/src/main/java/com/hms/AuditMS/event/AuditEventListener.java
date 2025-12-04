package com.hms.AuditMS.event;

import com.hms.AuditMS.entity.AuditLog;
import com.hms.AuditMS.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

@Slf4j
// @Component - Temporarily disabled
public class AuditEventListener {
    
    @Autowired
    private AuditLogRepository auditLogRepository;
    
    private boolean applicationReady = false;
    
    @org.springframework.context.event.EventListener
    public void handleApplicationReady(ApplicationReadyEvent event) {
        applicationReady = true;
        log.info("AuditMS application is ready to process events");
    }
    
    @org.springframework.context.event.EventListener(condition = "@auditEventListener.applicationReady")
    public void handleOPDVisitCreated(Object event) {
        try {
            if (!isSystemEvent(event)) {
                AuditLog auditLog = new AuditLog();
                auditLog.setModuleName("OPD");
                auditLog.setMicroservice("OPDMS");
                auditLog.setOperation("VISIT_CREATED");
                auditLog.setDescription("OPD Visit created: " + event.toString());
                auditLog.setLogLevel(AuditLog.LogLevel.INFO);
                auditLogRepository.save(auditLog);
            }
        } catch (Exception e) {
            log.error("Error saving audit log for OPD visit: {}", e.getMessage());
        }
    }
    
    @org.springframework.context.event.EventListener(condition = "@auditEventListener.applicationReady")
    public void handleIPDAdmissionCreated(Object event) {
        try {
            if (!isSystemEvent(event)) {
                AuditLog auditLog = new AuditLog();
                auditLog.setModuleName("IPD");
                auditLog.setMicroservice("IPDMS");
                auditLog.setOperation("ADMISSION_CREATED");
                auditLog.setDescription("IPD Admission created: " + event.toString());
                auditLog.setLogLevel(AuditLog.LogLevel.INFO);
                auditLogRepository.save(auditLog);
            }
        } catch (Exception e) {
            log.error("Error saving audit log for IPD admission: {}", e.getMessage());
        }
    }
    
    @org.springframework.context.event.EventListener(condition = "@auditEventListener.applicationReady")
    public void handleLabOrderCreated(Object event) {
        try {
            if (!isSystemEvent(event)) {
                AuditLog auditLog = new AuditLog();
                auditLog.setModuleName("LAB");
                auditLog.setMicroservice("LabMS");
                auditLog.setOperation("ORDER_CREATED");
                auditLog.setDescription("Lab Order created: " + event.toString());
                auditLog.setLogLevel(AuditLog.LogLevel.INFO);
                auditLogRepository.save(auditLog);
            }
        } catch (Exception e) {
            log.error("Error saving audit log for lab order: {}", e.getMessage());
        }
    }
    
    @org.springframework.context.event.EventListener(condition = "@auditEventListener.applicationReady")
    public void handleRadiologyOrderCreated(Object event) {
        try {
            if (!isSystemEvent(event)) {
                AuditLog auditLog = new AuditLog();
                auditLog.setModuleName("RADIOLOGY");
                auditLog.setMicroservice("RadiologyMS");
                auditLog.setOperation("ORDER_CREATED");
                auditLog.setDescription("Radiology Order created: " + event.toString());
                auditLog.setLogLevel(AuditLog.LogLevel.INFO);
                auditLogRepository.save(auditLog);
            }
        } catch (Exception e) {
            log.error("Error saving audit log for radiology order: {}", e.getMessage());
        }
    }
    
    @org.springframework.context.event.EventListener(condition = "@auditEventListener.applicationReady")
    public void handleBillingInvoicePaid(Object event) {
        try {
            if (!isSystemEvent(event)) {
                AuditLog auditLog = new AuditLog();
                auditLog.setModuleName("BILLING");
                auditLog.setMicroservice("BillingMS");
                auditLog.setOperation("INVOICE_PAID");
                auditLog.setDescription("Invoice paid: " + event.toString());
                auditLog.setLogLevel(AuditLog.LogLevel.INFO);
                auditLogRepository.save(auditLog);
            }
        } catch (Exception e) {
            log.error("Error saving audit log for billing invoice: {}", e.getMessage());
        }
    }
    
    private boolean isSystemEvent(Object event) {
        String eventClass = event.getClass().getSimpleName();
        return eventClass.contains("ApplicationEvent") || 
               eventClass.contains("ContextRefreshedEvent") ||
               eventClass.contains("ServletWebServerInitializedEvent") ||
               eventClass.contains("WebServerStartStopLifecycle");
    }
    
    public boolean isApplicationReady() {
        return applicationReady;
    }
}