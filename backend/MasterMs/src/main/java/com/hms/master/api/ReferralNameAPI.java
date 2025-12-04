package com.hms.master.api;

import com.hms.master.entity.ReferralName;
import com.hms.master.service.ReferralNameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/master/referral-names")
@CrossOrigin(origins = "*")
public class ReferralNameAPI {
    
    @Autowired
    private ReferralNameService service;
    
    @GetMapping
    public ResponseEntity<List<ReferralName>> getAllReferralNames() {
        return ResponseEntity.ok(service.getAllReferralNames());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ReferralName> getReferralNameById(@PathVariable Long id) {
        return service.getReferralNameById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<ReferralName> createReferralName(@RequestBody ReferralName referralName) {
        try {
            return ResponseEntity.ok(service.createReferralName(referralName));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create referral name: " + e.getMessage(), e);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ReferralName> updateReferralName(@PathVariable Long id, @RequestBody ReferralName referralName) {
        try {
            return ResponseEntity.ok(service.updateReferralName(id, referralName));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReferralName(@PathVariable Long id) {
        try {
            service.deleteReferralName(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/type/{referralTypeId}")
    public ResponseEntity<List<ReferralName>> getByReferralType(@PathVariable Long referralTypeId) {
        return ResponseEntity.ok(service.getByReferralType(referralTypeId));
    }
}