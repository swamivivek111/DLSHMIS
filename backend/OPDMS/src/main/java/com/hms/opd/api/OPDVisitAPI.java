package com.hms.opd.api;

import com.hms.opd.entity.OPDVisit;
import com.hms.opd.event.EventPublisher;
import com.hms.opd.event.OPDVisitCreatedEvent;
import com.hms.opd.repository.OPDVisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/opd/visit")
public class OPDVisitAPI {
    
    @Autowired
    private OPDVisitRepository visitRepository;
    
    @Autowired
    private EventPublisher eventPublisher;
    
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> createVisit(@RequestBody OPDVisit visit) {
        OPDVisit saved = visitRepository.save(visit);
        
        // Publish event
        OPDVisitCreatedEvent event = new OPDVisitCreatedEvent(
            saved.getVisitId(), saved.getPatientId(), saved.getDoctorId(),
            saved.getHospitalId(), saved.getVisitDate(), saved.getStatus().toString(),
            saved.getConsultationFee(), java.time.LocalDateTime.now()
        );
        eventPublisher.publishOPDVisitCreated(event);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "OPD Visit created successfully!");
        response.put("visitId", saved.getVisitId());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllVisits(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit) {
        
        Pageable pageable = PageRequest.of(page, limit);
        Page<OPDVisit> visits = visitRepository.findAll(pageable);
        
        Map<String, Object> response = new HashMap<>();
        response.put("visits", visits.getContent());
        response.put("totalPages", visits.getTotalPages());
        response.put("totalItems", visits.getTotalElements());
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<OPDVisit> getVisitById(@PathVariable Long id) {
        return visitRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateVisit(@PathVariable Long id, @RequestBody OPDVisit visit) {
        return visitRepository.findById(id)
                .map(existing -> {
                    visit.setVisitId(id);
                    OPDVisit updated = visitRepository.save(visit);
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Visit updated successfully!");
                    response.put("data", updated);
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteVisit(@PathVariable Long id) {
        if (visitRepository.existsById(id)) {
            visitRepository.deleteById(id);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Visit deleted successfully!");
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<OPDVisit>> getVisitsByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(visitRepository.findByPatientId(patientId));
    }
    
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<OPDVisit>> getVisitsByDoctor(@PathVariable Long doctorId) {
        return ResponseEntity.ok(visitRepository.findByDoctorId(doctorId));
    }
}