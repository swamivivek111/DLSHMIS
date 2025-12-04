package com.hms.master.api;

import com.hms.master.entity.ReferralType;
import com.hms.master.service.ReferralTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/master/referral-types")
@CrossOrigin(origins = "*")
public class ReferralTypeAPI {
    
    @Autowired
    private ReferralTypeService service;
    
    @GetMapping
    public ResponseEntity<List<ReferralType>> getAllReferralTypes() {
        return ResponseEntity.ok(service.getAllReferralTypes());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ReferralType> getReferralTypeById(@PathVariable Long id) {
        return service.getReferralTypeById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ReferralType> createReferralType(@RequestBody ReferralType referralType) {
        try {
            return ResponseEntity.ok(service.createReferralType(referralType));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create referral type: " + e.getMessage(), e);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ReferralType> updateReferralType(@PathVariable Long id, @RequestBody ReferralType referralType) {
        try {
            return ResponseEntity.ok(service.updateReferralType(id, referralType));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReferralType(@PathVariable Long id) {
        try {
            service.deleteReferralType(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<ReferralType>> searchReferralTypes(@RequestParam String referralTypeName) {
        return ResponseEntity.ok(service.searchReferralTypes(referralTypeName));
    }
}