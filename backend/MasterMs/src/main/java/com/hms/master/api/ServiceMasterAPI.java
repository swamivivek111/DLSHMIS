package com.hms.master.api;

import com.hms.master.entity.ServiceMaster;
import com.hms.master.service.ServiceMasterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/master/services")
@CrossOrigin(origins = "*")
public class ServiceMasterAPI {
    
    @Autowired
    private ServiceMasterService service;
    
    @GetMapping
    public ResponseEntity<List<ServiceMaster>> getAllServices() {
        return ResponseEntity.ok(service.getAllServices());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ServiceMaster> getServiceById(@PathVariable Long id) {
        return service.getServiceById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ServiceMaster> createService(@RequestBody ServiceMaster serviceMaster) {
        try {
            return ResponseEntity.ok(service.createService(serviceMaster));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create service: " + e.getMessage(), e);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ServiceMaster> updateService(@PathVariable Long id, @RequestBody ServiceMaster serviceMaster) {
        try {
            return ResponseEntity.ok(service.updateService(id, serviceMaster));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteService(@PathVariable Long id) {
        try {
            service.deleteService(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<ServiceMaster>> searchServices(@RequestParam String serviceName) {
        return ResponseEntity.ok(service.searchServices(serviceName));
    }
}