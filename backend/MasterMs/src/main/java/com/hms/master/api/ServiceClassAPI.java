package com.hms.master.api;

import com.hms.master.entity.ServiceClass;
import com.hms.master.service.ServiceClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/master/service-classes")
@CrossOrigin(origins = "*")
public class ServiceClassAPI {
    
    @Autowired
    private ServiceClassService service;
    
    @GetMapping
    public ResponseEntity<List<ServiceClass>> getAllServiceClasses() {
        return ResponseEntity.ok(service.getAllServiceClasses());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ServiceClass> getServiceClassById(@PathVariable Long id) {
        return service.getServiceClassById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ServiceClass> createServiceClass(@RequestBody ServiceClass serviceClass) {
        try {
            return ResponseEntity.ok(service.createServiceClass(serviceClass));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create service class: " + e.getMessage(), e);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ServiceClass> updateServiceClass(@PathVariable Long id, @RequestBody ServiceClass serviceClass) {
        try {
            return ResponseEntity.ok(service.updateServiceClass(id, serviceClass));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServiceClass(@PathVariable Long id) {
        try {
            service.deleteServiceClass(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<ServiceClass>> searchServiceClasses(@RequestParam String serviceClassName) {
        return ResponseEntity.ok(service.searchServiceClasses(serviceClassName));
    }
}