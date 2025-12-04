package com.hms.billing.api;

import com.hms.billing.entity.Report;
import com.hms.billing.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/billing/reports")
public class ReportAPI {
    
    @Autowired
    private ReportRepository reportRepository;
    
    @GetMapping("/daily")
    public ResponseEntity<Map<String, Object>> getDailyReport() {
        Map<String, Object> reportData = new HashMap<>();
        reportData.put("totalRevenue", 50000.0);
        reportData.put("totalTransactions", 150);
        reportData.put("avgTransactionValue", 333.33);
        reportData.put("date", LocalDateTime.now().toLocalDate());
        
        Report report = new Report();
        report.setReportName("Daily Revenue Report");
        report.setReportType("DAILY");
        report.setReportData(reportData.toString());
        report.setModule("BILLING");
        reportRepository.save(report);
        
        return ResponseEntity.ok(reportData);
    }
    
    @GetMapping("/monthly")
    public ResponseEntity<Map<String, Object>> getMonthlyReport() {
        Map<String, Object> reportData = new HashMap<>();
        reportData.put("totalRevenue", 1500000.0);
        reportData.put("totalTransactions", 4500);
        reportData.put("avgTransactionValue", 333.33);
        reportData.put("month", LocalDateTime.now().getMonth());
        
        Report report = new Report();
        report.setReportName("Monthly Revenue Report");
        report.setReportType("MONTHLY");
        report.setReportData(reportData.toString());
        report.setModule("BILLING");
        reportRepository.save(report);
        
        return ResponseEntity.ok(reportData);
    }
    
    @GetMapping("/analytics")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("patientGrowth", 15.5);
        analytics.put("revenueGrowth", 12.3);
        analytics.put("avgWaitTime", 25.5);
        analytics.put("bedOccupancy", 78.5);
        analytics.put("labUtilization", 85.2);
        
        return ResponseEntity.ok(analytics);
    }
    
    @GetMapping("/history")
    public ResponseEntity<List<Report>> getReportHistory() {
        return ResponseEntity.ok(reportRepository.findAll());
    }
}