package com.hms.master.api;

import com.hms.master.entity.ServiceGroup;
import com.hms.master.service.ServiceGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/master/service-groups")
@CrossOrigin(origins = "*")
public class ServiceGroupAPI {
    
    @Autowired
    private ServiceGroupService service;
    
    @GetMapping
    public ResponseEntity<List<ServiceGroup>> getAllServiceGroups() {
        return ResponseEntity.ok(service.getAllServiceGroups());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ServiceGroup> getServiceGroupById(@PathVariable Long id) {
        return service.getServiceGroupById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ServiceGroup> createServiceGroup(@RequestBody ServiceGroup serviceGroup) {
        try {
            return ResponseEntity.ok(service.createServiceGroup(serviceGroup));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create service group: " + e.getMessage(), e);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ServiceGroup> updateServiceGroup(@PathVariable Long id, @RequestBody ServiceGroup serviceGroup) {
        try {
            return ResponseEntity.ok(service.updateServiceGroup(id, serviceGroup));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServiceGroup(@PathVariable Long id) {
        try {
            service.deleteServiceGroup(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<ServiceGroup>> searchServiceGroups(@RequestParam String groupName) {
        return ResponseEntity.ok(service.searchServiceGroups(groupName));
    }
    
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<List<ServiceGroup>> getByDepartmentId(@PathVariable Long departmentId) {
        return ResponseEntity.ok(service.getByDepartmentId(departmentId));
    }
}