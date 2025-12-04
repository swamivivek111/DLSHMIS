package com.hms.master.api;

import com.hms.master.entity.CategoryTariffMapping;
import com.hms.master.service.CategoryTariffMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/master/category-tariff-mapping")
@CrossOrigin(origins = "*")
public class CategoryTariffMappingAPI {
    
    @Autowired
    private CategoryTariffMappingService service;
    
    @GetMapping("/list")
    public ResponseEntity<Map<String, Object>> getAllMappings() {
        try {
            List<CategoryTariffMapping> mappings = service.getAllMappings();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("mappings", mappings);
            response.put("count", mappings.size());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getMappingById(@PathVariable Long id) {
        try {
            return service.getMappingById(id)
                .map(mapping -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("success", true);
                    response.put("mapping", mapping);
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
    public ResponseEntity<Map<String, Object>> createMapping(@RequestBody CategoryTariffMapping mapping) {
        try {
            CategoryTariffMapping created = service.createMapping(mapping);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Mapping created successfully");
            response.put("mapping", created);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateMapping(@PathVariable Long id, @RequestBody CategoryTariffMapping mapping) {
        try {
            CategoryTariffMapping updated = service.updateMapping(id, mapping);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Mapping updated successfully");
            response.put("mapping", updated);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteMapping(@PathVariable Long id) {
        try {
            service.deleteMapping(id);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Mapping deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}