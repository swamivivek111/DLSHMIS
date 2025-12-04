package com.hms.IPDMS.api;

import com.hms.IPDMS.entity.Admission;
import com.hms.IPDMS.repository.AdmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/ipd/admission")
public class AdmissionAPI {
    
    @Autowired
    private AdmissionRepository admissionRepository;
    
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> createAdmission(@RequestBody Admission admission) {
        Admission saved = admissionRepository.save(admission);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Patient admitted successfully!");
        response.put("admissionId", saved.getAdmissionId());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/getall")
    public ResponseEntity<List<Admission>> getAllAdmissions() {
        return ResponseEntity.ok(admissionRepository.findAll());
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<Admission> getAdmissionById(@PathVariable Long id) {
        return admissionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/discharge/{id}")
    public ResponseEntity<Map<String, Object>> dischargePatient(@PathVariable Long id) {
        return admissionRepository.findById(id)
                .map(admission -> {
                    admission.setStatus(Admission.AdmissionStatus.DISCHARGED);
                    admissionRepository.save(admission);
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Patient discharged successfully!");
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}