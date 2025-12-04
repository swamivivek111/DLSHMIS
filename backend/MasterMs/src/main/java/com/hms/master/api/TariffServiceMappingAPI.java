package com.hms.master.api;

import com.hms.master.entity.TariffServiceMapping;
import com.hms.master.service.TariffServiceMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/master/tariff-service-mappings")
@CrossOrigin(origins = "*")
public class TariffServiceMappingAPI {
    
    @Autowired
    private TariffServiceMappingService service;
    
    @GetMapping
    public ResponseEntity<List<TariffServiceMapping>> getAllTariffServiceMappings() {
        return ResponseEntity.ok(service.getAllTariffServiceMappings());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TariffServiceMapping> getTariffServiceMappingById(@PathVariable Long id) {
        return service.getTariffServiceMappingById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<TariffServiceMapping> createTariffServiceMapping(@RequestBody TariffServiceMapping tariffServiceMapping) {
        try {
            return ResponseEntity.ok(service.createTariffServiceMapping(tariffServiceMapping));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create tariff service mapping: " + e.getMessage(), e);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TariffServiceMapping> updateTariffServiceMapping(@PathVariable Long id, @RequestBody TariffServiceMapping tariffServiceMapping) {
        try {
            return ResponseEntity.ok(service.updateTariffServiceMapping(id, tariffServiceMapping));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTariffServiceMapping(@PathVariable Long id) {
        try {
            service.deleteTariffServiceMapping(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<TariffServiceMapping>> searchTariffServiceMappings(@RequestParam String serviceName) {
        return ResponseEntity.ok(service.searchTariffServiceMappings(serviceName));
    }
    
    @GetMapping("/service/{serviceId}")
    public ResponseEntity<List<TariffServiceMapping>> getByServiceId(@PathVariable Long serviceId) {
        return ResponseEntity.ok(service.getByServiceId(serviceId));
    }
    
    @GetMapping("/tariff-category/{companyTariffCategoryId}")
    public ResponseEntity<List<TariffServiceMapping>> getByCompanyTariffCategoryId(@PathVariable Long companyTariffCategoryId) {
        return ResponseEntity.ok(service.getByCompanyTariffCategoryId(companyTariffCategoryId));
    }
}