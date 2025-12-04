package com.hms.master.api;

import com.hms.master.entity.ServiceSubGroup;
import com.hms.master.service.ServiceSubGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/master/service-sub-groups")
@CrossOrigin(origins = "*")
public class ServiceSubGroupAPI {
    
    @Autowired
    private ServiceSubGroupService service;
    
    @GetMapping
    public ResponseEntity<List<ServiceSubGroup>> getAllServiceSubGroups() {
        return ResponseEntity.ok(service.getAllServiceSubGroups());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ServiceSubGroup> getServiceSubGroupById(@PathVariable Long id) {
        return service.getServiceSubGroupById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ServiceSubGroup> createServiceSubGroup(@RequestBody ServiceSubGroup serviceSubGroup) {
        try {
            return ResponseEntity.ok(service.createServiceSubGroup(serviceSubGroup));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create service sub group: " + e.getMessage(), e);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ServiceSubGroup> updateServiceSubGroup(@PathVariable Long id, @RequestBody ServiceSubGroup serviceSubGroup) {
        try {
            return ResponseEntity.ok(service.updateServiceSubGroup(id, serviceSubGroup));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServiceSubGroup(@PathVariable Long id) {
        try {
            service.deleteServiceSubGroup(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<ServiceSubGroup>> searchServiceSubGroups(@RequestParam String subGroupName) {
        return ResponseEntity.ok(service.searchServiceSubGroups(subGroupName));
    }
    
    @GetMapping("/group/{groupId}")
    public ResponseEntity<List<ServiceSubGroup>> getByGroupId(@PathVariable Long groupId) {
        return ResponseEntity.ok(service.getByGroupId(groupId));
    }
}