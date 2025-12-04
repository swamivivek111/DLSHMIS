package com.hms.gateway.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/mobile")
public class MobileAPI {
    
    @GetMapping("/config")
    public ResponseEntity<Map<String, Object>> getMobileConfig() {
        Map<String, Object> config = new HashMap<>();
        config.put("apiVersion", "v1.0");
        config.put("baseUrl", "http://localhost:9000");
        config.put("features", new String[]{"appointments", "lab_results", "notifications", "billing"});
        config.put("supportedPlatforms", new String[]{"iOS", "Android", "React Native"});
        
        return ResponseEntity.ok(config);
    }
    
    @GetMapping("/endpoints")
    public ResponseEntity<Map<String, Object>> getMobileEndpoints() {
        Map<String, Object> endpoints = new HashMap<>();
        endpoints.put("login", "/user/login");
        endpoints.put("profile", "/profile/patient");
        endpoints.put("appointments", "/appointment");
        endpoints.put("lab_results", "/lab");
        endpoints.put("notifications", "/notification");
        endpoints.put("billing", "/billing");
        
        return ResponseEntity.ok(endpoints);
    }
    
    @PostMapping("/register-device")
    public ResponseEntity<Map<String, Object>> registerDevice(@RequestBody Map<String, Object> deviceInfo) {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Device registered successfully");
        response.put("deviceId", "DEVICE_" + System.currentTimeMillis());
        response.put("pushEnabled", true);
        
        return ResponseEntity.ok(response);
    }
}