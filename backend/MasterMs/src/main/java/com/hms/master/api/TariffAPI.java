package com.hms.master.api;

import com.hms.master.entity.Tariff;
import com.hms.master.service.TariffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/master/tariffs")
@CrossOrigin(origins = "*")
public class TariffAPI {
    
    @Autowired
    private TariffService service;
    
    @GetMapping
    public ResponseEntity<List<Tariff>> getAllTariffs() {
        return ResponseEntity.ok(service.getAllTariffs());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Tariff> getTariffById(@PathVariable Long id) {
        return service.getTariffById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Tariff> createTariff(@RequestBody Tariff tariff) {
        try {
            return ResponseEntity.ok(service.createTariff(tariff));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create tariff: " + e.getMessage(), e);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Tariff> updateTariff(@PathVariable Long id, @RequestBody Tariff tariff) {
        try {
            return ResponseEntity.ok(service.updateTariff(id, tariff));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTariff(@PathVariable Long id) {
        try {
            service.deleteTariff(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<Tariff>> getActiveTariffs() {
        return ResponseEntity.ok(service.getActiveTariffs());
    }
    
    @GetMapping("/category/{serviceCategory}")
    public ResponseEntity<List<Tariff>> getTariffsByServiceCategory(@PathVariable String serviceCategory) {
        return ResponseEntity.ok(service.getTariffsByServiceCategory(serviceCategory));
    }
    
    @GetMapping("/service/{serviceName}")
    public ResponseEntity<List<Tariff>> getTariffsByServiceName(@PathVariable String serviceName) {
        return ResponseEntity.ok(service.getTariffsByServiceName(serviceName));
    }
    
    @GetMapping("/department/{department}")
    public ResponseEntity<List<Tariff>> getTariffsByDepartment(@PathVariable String department) {
        return ResponseEntity.ok(service.getTariffsByDepartment(department));
    }
    
    @GetMapping("/next-code")
    public ResponseEntity<String> getNextTariffCode() {
        return ResponseEntity.ok(service.getNextTariffCode());
    }
}