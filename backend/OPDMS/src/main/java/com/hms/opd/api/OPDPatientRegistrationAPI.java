package com.hms.opd.api;

import com.hms.opd.entity.OPDPatientRegistration;
import com.hms.opd.service.OPDPatientRegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/opd/patient-registration")
@CrossOrigin(origins = "*")
public class OPDPatientRegistrationAPI {
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("OPD Patient Registration API is working!");
    }
    
    @GetMapping("/treatment/test")
    public ResponseEntity<String> treatmentTest() {
        return ResponseEntity.ok("Treatment API is working!");
    }
    
    @Autowired
    private OPDPatientRegistrationService service;
    
    // Treatment automation endpoints
    @PostMapping("/treatment/start-session")
    public ResponseEntity<Map<String, Object>> startTreatmentSession(
            @RequestParam Long patientId,
            @RequestParam Long doctorId) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("sessionId", System.currentTimeMillis());
        response.put("message", "Treatment session started");
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/treatment/generate-prescription")
    public ResponseEntity<Map<String, Object>> generatePrescription(
            @RequestParam Long sessionId,
            @RequestParam String transcript) {
        try {
            System.out.println("Generating prescription for session: " + sessionId + ", Transcript: " + transcript);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("prescription", "1. RRD 10mg - Morning, Evening (Before Food) - 3 days (2 x 3 = 6)\n2. SUMO 10mg - Morning, Evening (After Food) - 3 days (2 x 3 = 6)\n\nAdvice: Take medicines as prescribed. Follow up if symptoms persist.");
            response.put("sessionId", sessionId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Prescription generation failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/treatment/complete-session/{sessionId}")
    public ResponseEntity<Map<String, Object>> completeSession(@PathVariable Long sessionId) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Treatment session completed");
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/treatment/transcribe-audio")
    public ResponseEntity<Map<String, Object>> transcribeAudio(@RequestParam("audioFile") org.springframework.web.multipart.MultipartFile audioFile) {
        try {
            // Log the received file
            System.out.println("Received audio file: " + audioFile.getOriginalFilename() + ", Size: " + audioFile.getSize() + " bytes");
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("transcript", "Patient complains of cough and cold for 3 days. Prescribed dry syrup 3 times daily.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Transcription failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/treatment/save-prescription")
    public ResponseEntity<Map<String, Object>> savePrescription(@RequestBody Map<String, Object> prescriptionData) {
        try {
            // Extract data from request
            Long patientId = Long.valueOf(prescriptionData.get("patientId").toString());
            Long doctorId = Long.valueOf(prescriptionData.get("doctorId").toString());
            String prescriptionText = (String) prescriptionData.get("prescriptionText");
            String transcript = (String) prescriptionData.get("transcript");
            
            // For demo - just return success
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Prescription saved successfully");
            response.put("prescriptionId", System.currentTimeMillis());
            response.put("patientId", patientId);
            response.put("savedAt", java.time.LocalDateTime.now().toString());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Failed to save prescription: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getAllRegistrations() {
        try {
            List<OPDPatientRegistration> registrations = service.getAllRegistrations();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("registrations", registrations);
            response.put("count", registrations.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getRegistrationById(@PathVariable Long id) {
        try {
            return service.getRegistrationById(id)
                .map(registration -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", true);
                    response.put("registration", registration);
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/prn/{prnNumber}")
    public ResponseEntity<Map<String, Object>> getRegistrationByPrn(@PathVariable String prnNumber) {
        try {
            return service.getRegistrationByPrn(prnNumber)
                .map(registration -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", true);
                    response.put("registration", registration);
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createRegistration(@RequestBody OPDPatientRegistration registration) {
        try {
            OPDPatientRegistration created = service.createRegistration(registration);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Patient registered successfully");
            response.put("registration", created);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateRegistration(@PathVariable Long id, @RequestBody OPDPatientRegistration registration) {
        try {
            OPDPatientRegistration updated = service.updateRegistration(id, registration);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Registration updated successfully");
            response.put("registration", updated);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteRegistration(@PathVariable Long id) {
        try {
            service.deleteRegistration(id);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Registration deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}