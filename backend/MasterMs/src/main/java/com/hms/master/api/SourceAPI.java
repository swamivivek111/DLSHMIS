package com.hms.master.api;

import com.hms.master.entity.Source;
import com.hms.master.service.SourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/master/sources")
@CrossOrigin(origins = "*")
public class SourceAPI {
    
    @Autowired
    private SourceService service;
    
    @GetMapping
    public ResponseEntity<List<Source>> getAllSources() {
        return ResponseEntity.ok(service.getAllSources());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Source> getSourceById(@PathVariable Long id) {
        return service.getSourceById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Source> createSource(@RequestBody Source source) {
        try {
            return ResponseEntity.ok(service.createSource(source));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create source: " + e.getMessage(), e);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Source> updateSource(@PathVariable Long id, @RequestBody Source source) {
        try {
            return ResponseEntity.ok(service.updateSource(id, source));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSource(@PathVariable Long id) {
        try {
            service.deleteSource(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Source>> searchSources(@RequestParam String sourceName) {
        return ResponseEntity.ok(service.searchSources(sourceName));
    }
}