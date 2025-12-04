package com.hms.master.api;

import com.hms.master.entity.ServiceType;
import com.hms.master.service.ServiceTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/master/service-types")
@CrossOrigin(origins = "*")
public class ServiceTypeAPI {
    
    @Autowired
    private ServiceTypeService service;
    
    @GetMapping
    public ResponseEntity<List<ServiceType>> getAllServiceTypes() {
        return ResponseEntity.ok(service.getAllServiceTypes());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ServiceType> getServiceTypeById(@PathVariable Long id) {
        return service.getServiceTypeById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ServiceType> createServiceType(@RequestBody ServiceType serviceType) {
        try {
            return ResponseEntity.ok(service.createServiceType(serviceType));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create service type: " + e.getMessage(), e);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ServiceType> updateServiceType(@PathVariable Long id, @RequestBody ServiceType serviceType) {
        try {
            return ResponseEntity.ok(service.updateServiceType(id, serviceType));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServiceType(@PathVariable Long id) {
        try {
            service.deleteServiceType(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/class/{serviceClassName}")
    public ResponseEntity<List<ServiceType>> getByServiceClass(@PathVariable Long serviceClassName) {
        return ResponseEntity.ok(service.getByServiceClass(serviceClassName));
    }
}