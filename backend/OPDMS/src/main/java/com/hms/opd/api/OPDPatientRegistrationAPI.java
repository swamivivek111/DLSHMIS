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
    
    @Autowired
    private OPDPatientRegistrationService service;
    
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