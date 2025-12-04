package com.hms.opd.api;

import com.hms.opd.entity.OPDQueue;
import com.hms.opd.repository.OPDQueueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/opd/queue")
public class OPDQueueAPI {
    
    @Autowired
    private OPDQueueRepository queueRepository;
    
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addToQueue(@RequestBody OPDQueue queue) {
        OPDQueue saved = queueRepository.save(queue);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Added to queue successfully!");
        response.put("queueId", saved.getQueueId());
        response.put("tokenNumber", saved.getTokenNumber());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<OPDQueue>> getQueueByDoctor(@PathVariable Long doctorId) {
        return ResponseEntity.ok(queueRepository.findByDoctorIdAndStatusOrderByTokenNumber(
                doctorId, OPDQueue.QueueStatus.WAITING));
    }
    
    @PutMapping("/call/{queueId}")
    public ResponseEntity<Map<String, Object>> callPatient(@PathVariable Long queueId) {
        return queueRepository.findById(queueId)
                .map(queue -> {
                    queue.setStatus(OPDQueue.QueueStatus.CALLED);
                    queueRepository.save(queue);
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Patient called successfully!");
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/complete/{queueId}")
    public ResponseEntity<Map<String, Object>> completeConsultation(@PathVariable Long queueId) {
        return queueRepository.findById(queueId)
                .map(queue -> {
                    queue.setStatus(OPDQueue.QueueStatus.COMPLETED);
                    queueRepository.save(queue);
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Consultation completed!");
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}