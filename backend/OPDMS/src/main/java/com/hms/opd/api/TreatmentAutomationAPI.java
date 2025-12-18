package com.hms.opd.api;

import com.hms.opd.entity.TreatmentSession;
import com.hms.opd.service.TreatmentAutomationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/opd/treatment")
@CrossOrigin(origins = "*")
public class TreatmentAutomationAPI {
    
    @Autowired
    private TreatmentAutomationService treatmentService;
    
    @PostMapping("/start-session")
    public ResponseEntity<Map<String, Object>> startTreatmentSession(
            @RequestParam Long patientId,
            @RequestParam Long doctorId) {
        try {
            TreatmentSession session = treatmentService.startTreatmentSession(patientId, doctorId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("sessionId", session.getId());
            response.put("message", "Treatment session started");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/transcribe-audio")
    public ResponseEntity<Map<String, Object>> transcribeAudio(
            @RequestParam("audioFile") MultipartFile audioFile) {
        try {
            String transcript = treatmentService.transcribeAudio(audioFile);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("transcript", transcript);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/generate-prescription")
    public ResponseEntity<Map<String, Object>> generatePrescription(
            @RequestParam Long sessionId,
            @RequestParam String transcript) {
        try {
            TreatmentSession session = treatmentService.updateSessionWithTranscript(sessionId, transcript);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("prescription", session.getGeneratedPrescription());
            response.put("sessionId", session.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/complete-session/{sessionId}")
    public ResponseEntity<Map<String, Object>> completeSession(@PathVariable Long sessionId) {
        try {
            TreatmentSession session = treatmentService.completeTreatmentSession(sessionId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Treatment session completed");
            response.put("session", session);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/session/{sessionId}")
    public ResponseEntity<Map<String, Object>> getSession(@PathVariable Long sessionId) {
        try {
            TreatmentSession session = treatmentService.getSessionById(sessionId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("session", session);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}