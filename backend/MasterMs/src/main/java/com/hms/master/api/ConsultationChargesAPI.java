package com.hms.master.api;

import com.hms.master.entity.ConsultationCharges;
import com.hms.master.service.ConsultationChargesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/master/consultation-charges")
@CrossOrigin(origins = "*")
public class ConsultationChargesAPI {
    
    @Autowired
    private ConsultationChargesService service;
    
    @GetMapping
    public ResponseEntity<List<ConsultationCharges>> getAllConsultationCharges() {
        return ResponseEntity.ok(service.getAllConsultationCharges());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ConsultationCharges> getConsultationChargesById(@PathVariable Long id) {
        return service.getConsultationChargesById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ConsultationCharges> createConsultationCharges(@RequestBody ConsultationCharges consultationCharges) {
        try {
            return ResponseEntity.ok(service.createConsultationCharges(consultationCharges));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create consultation charges: " + e.getMessage(), e);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ConsultationCharges> updateConsultationCharges(@PathVariable Long id, @RequestBody ConsultationCharges consultationCharges) {
        try {
            return ResponseEntity.ok(service.updateConsultationCharges(id, consultationCharges));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsultationCharges(@PathVariable Long id) {
        try {
            service.deleteConsultationCharges(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<ConsultationCharges>> getByDepartment(@PathVariable Long departmentId) {
        return ResponseEntity.ok(service.getByDepartment(departmentId));
    }
    
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<ConsultationCharges>> getByDoctor(@PathVariable Long doctorId) {
        return ResponseEntity.ok(service.getByDoctor(doctorId));
    }
}