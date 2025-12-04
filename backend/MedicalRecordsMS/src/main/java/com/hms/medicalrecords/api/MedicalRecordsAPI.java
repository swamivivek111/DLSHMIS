package com.hms.medicalrecords.api;

import com.hms.medicalrecords.entity.MedicalRecord;
import com.hms.medicalrecords.repository.MedicalRecordRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/medicalrecords")
@Tag(name = "Medical Records Management", description = "APIs for managing patient medical records")
public class MedicalRecordsAPI {
    
    @Autowired
    private MedicalRecordRepository medicalRecordRepository;
    
    @PostMapping("/record")
    @Operation(summary = "Create a new medical record")
    public ResponseEntity<MedicalRecord> createRecord(@RequestBody MedicalRecord record) {
        MedicalRecord savedRecord = medicalRecordRepository.save(record);
        return new ResponseEntity<>(savedRecord, HttpStatus.CREATED);
    }
    
    @GetMapping("/record/{id}")
    @Operation(summary = "Get medical record by ID")
    public ResponseEntity<MedicalRecord> getRecord(@PathVariable Long id) {
        return medicalRecordRepository.findById(id)
            .map(record -> new ResponseEntity<>(record, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/records")
    @Operation(summary = "Get all medical records")
    public ResponseEntity<List<MedicalRecord>> getAllRecords() {
        List<MedicalRecord> records = medicalRecordRepository.findAll();
        return new ResponseEntity<>(records, HttpStatus.OK);
    }
}