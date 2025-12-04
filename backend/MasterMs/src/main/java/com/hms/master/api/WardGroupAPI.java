package com.hms.master.api;

import com.hms.master.entity.WardGroup;
import com.hms.master.service.WardGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/master/ward-groups")
@CrossOrigin(origins = "*")
public class WardGroupAPI {
    
    @Autowired
    private WardGroupService service;
    
    @GetMapping
    public ResponseEntity<List<WardGroup>> getAllWardGroups() {
        return ResponseEntity.ok(service.getAllWardGroups());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<WardGroup> getWardGroupById(@PathVariable Long id) {
        return service.getWardGroupById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<WardGroup> createWardGroup(@RequestBody WardGroup wardGroup) {
        try {
            return ResponseEntity.ok(service.createWardGroup(wardGroup));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create ward group: " + e.getMessage(), e);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<WardGroup> updateWardGroup(@PathVariable Long id, @RequestBody WardGroup wardGroup) {
        try {
            return ResponseEntity.ok(service.updateWardGroup(id, wardGroup));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWardGroup(@PathVariable Long id) {
        try {
            service.deleteWardGroup(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<WardGroup>> searchWardGroups(@RequestParam String wardGroupName) {
        return ResponseEntity.ok(service.searchWardGroups(wardGroupName));
    }
}