package com.hms.lab.api;

import com.hms.lab.entity.LabSample;
import com.hms.lab.repository.LabSampleRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/lab/samples")
@Tag(name = "Lab Sample Collection", description = "APIs for managing lab sample collection")
public class LabSampleAPI {
    
    @Autowired
    private LabSampleRepository labSampleRepository;
    
    @PostMapping
    @Operation(summary = "Collect new sample")
    public ResponseEntity<LabSample> collectSample(@RequestBody LabSample sample) {
        LabSample savedSample = labSampleRepository.save(sample);
        return new ResponseEntity<>(savedSample, HttpStatus.CREATED);
    }
    
    @GetMapping
    @Operation(summary = "Get all samples")
    public ResponseEntity<List<LabSample>> getAllSamples() {
        List<LabSample> samples = labSampleRepository.findAll();
        return new ResponseEntity<>(samples, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get sample by ID")
    public ResponseEntity<LabSample> getSample(@PathVariable Long id) {
        return labSampleRepository.findById(id)
            .map(sample -> new ResponseEntity<>(sample, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/barcode/{barcode}")
    @Operation(summary = "Get sample by barcode")
    public ResponseEntity<LabSample> getSampleByBarcode(@PathVariable String barcode) {
        return labSampleRepository.findByBarcode(barcode)
            .map(sample -> new ResponseEntity<>(sample, HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update sample")
    public ResponseEntity<LabSample> updateSample(@PathVariable Long id, @RequestBody LabSample sample) {
        if (!labSampleRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        sample.setId(id);
        LabSample updatedSample = labSampleRepository.save(sample);
        return new ResponseEntity<>(updatedSample, HttpStatus.OK);
    }
    
    @GetMapping("/status/{status}")
    @Operation(summary = "Get samples by status")
    public ResponseEntity<List<LabSample>> getSamplesByStatus(@PathVariable LabSample.SampleStatus status) {
        List<LabSample> samples = labSampleRepository.findByStatus(status);
        return new ResponseEntity<>(samples, HttpStatus.OK);
    }
}