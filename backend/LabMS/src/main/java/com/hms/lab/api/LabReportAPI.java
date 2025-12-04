package com.hms.lab.api;

import com.hms.lab.entity.LabReport;
import com.hms.lab.repository.LabReportRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/lab/reports")
@Tag(name = "Lab Reports", description = "APIs for managing lab reports")
public class LabReportAPI {
    
    @Autowired
    private LabReportRepository labReportRepository;
    
    @PostMapping
    @Operation(summary = "Generate lab report")
    public ResponseEntity<LabReport> generateReport(@RequestBody LabReport report) {
        LabReport savedReport = labReportRepository.save(report);
        return new ResponseEntity<>(savedReport, HttpStatus.CREATED);
    }
    
    @GetMapping
    @Operation(summary = "Get all lab reports")
    public ResponseEntity<List<LabReport>> getAllReports() {
        List<LabReport> reports = labReportRepository.findAll();
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get lab report by ID")
    public ResponseEntity<LabReport> getReport(@PathVariable Long id) {
        return labReportRepository.findById(id)
            .map(report -> new ResponseEntity<>(report, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete lab report")
    public ResponseEntity<String> deleteReport(@PathVariable Long id) {
        if (!labReportRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        labReportRepository.deleteById(id);
        return new ResponseEntity<>("Report deleted successfully", HttpStatus.OK);
    }
}