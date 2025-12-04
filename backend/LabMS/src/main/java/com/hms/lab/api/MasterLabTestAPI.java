package com.hms.lab.api;

import com.hms.lab.entity.MasterLabTest;
import com.hms.lab.repository.MasterLabTestRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/lab/tests")
@Tag(name = "Master Lab Tests", description = "APIs for managing lab test master data")
public class MasterLabTestAPI {
    
    @Autowired
    private MasterLabTestRepository masterLabTestRepository;
    
    @PostMapping
    @Operation(summary = "Create new lab test")
    public ResponseEntity<MasterLabTest> createTest(@RequestBody MasterLabTest test) {
        MasterLabTest savedTest = masterLabTestRepository.save(test);
        return new ResponseEntity<>(savedTest, HttpStatus.CREATED);
    }
    
    @GetMapping
    @Operation(summary = "Get all lab tests")
    public ResponseEntity<List<MasterLabTest>> getAllTests() {
        List<MasterLabTest> tests = masterLabTestRepository.findAll();
        return new ResponseEntity<>(tests, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get lab test by ID")
    public ResponseEntity<MasterLabTest> getTest(@PathVariable Long id) {
        return masterLabTestRepository.findById(id)
            .map(test -> new ResponseEntity<>(test, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update lab test")
    public ResponseEntity<MasterLabTest> updateTest(@PathVariable Long id, @RequestBody MasterLabTest test) {
        if (!masterLabTestRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        test.setId(id);
        MasterLabTest updatedTest = masterLabTestRepository.save(test);
        return new ResponseEntity<>(updatedTest, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete lab test")
    public ResponseEntity<String> deleteTest(@PathVariable Long id) {
        if (!masterLabTestRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        masterLabTestRepository.deleteById(id);
        return new ResponseEntity<>("Test deleted successfully", HttpStatus.OK);
    }
    
    @GetMapping("/active")
    @Operation(summary = "Get active lab tests")
    public ResponseEntity<List<MasterLabTest>> getActiveTests() {
        List<MasterLabTest> tests = masterLabTestRepository.findByActiveTrue();
        return new ResponseEntity<>(tests, HttpStatus.OK);
    }
    
    @GetMapping("/category/{category}")
    @Operation(summary = "Get tests by category")
    public ResponseEntity<List<MasterLabTest>> getTestsByCategory(@PathVariable String category) {
        List<MasterLabTest> tests = masterLabTestRepository.findByCategory(category);
        return new ResponseEntity<>(tests, HttpStatus.OK);
    }
}