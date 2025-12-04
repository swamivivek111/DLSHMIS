package com.hms.lab.api;

import com.hms.lab.entity.LabTestResult;
import com.hms.lab.repository.LabTestResultRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/lab/results")
@Tag(name = "Lab Test Results", description = "APIs for managing lab test results")
public class LabTestResultAPI {
    
    @Autowired
    private LabTestResultRepository labTestResultRepository;
    
    @PostMapping
    @Operation(summary = "Create test result")
    public ResponseEntity<LabTestResult> createResult(@RequestBody LabTestResult result) {
        LabTestResult savedResult = labTestResultRepository.save(result);
        return new ResponseEntity<>(savedResult, HttpStatus.CREATED);
    }
    
    @GetMapping
    @Operation(summary = "Get all test results")
    public ResponseEntity<List<LabTestResult>> getAllResults() {
        List<LabTestResult> results = labTestResultRepository.findAll();
        return new ResponseEntity<>(results, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get test result by ID")
    public ResponseEntity<LabTestResult> getResult(@PathVariable Long id) {
        return labTestResultRepository.findById(id)
            .map(result -> new ResponseEntity<>(result, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update test result")
    public ResponseEntity<LabTestResult> updateResult(@PathVariable Long id, @RequestBody LabTestResult result) {
        if (!labTestResultRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        result.setId(id);
        LabTestResult updatedResult = labTestResultRepository.save(result);
        return new ResponseEntity<>(updatedResult, HttpStatus.OK);
    }
    
    @PutMapping("/{id}/validate")
    @Operation(summary = "Validate test result")
    public ResponseEntity<LabTestResult> validateResult(@PathVariable Long id, @RequestParam Long validatorId) {
        return labTestResultRepository.findById(id)
            .map(result -> {
                result.setValidated(true);
                result.setValidatorId(validatorId);
                result.setValidationTime(LocalDateTime.now());
                LabTestResult updatedResult = labTestResultRepository.save(result);
                return new ResponseEntity<>(updatedResult, HttpStatus.OK);
            })
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/pending")
    @Operation(summary = "Get pending validation results")
    public ResponseEntity<List<LabTestResult>> getPendingResults() {
        List<LabTestResult> results = labTestResultRepository.findByValidated(false);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }
}