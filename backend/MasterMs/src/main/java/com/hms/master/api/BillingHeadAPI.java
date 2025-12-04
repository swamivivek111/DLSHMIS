package com.hms.master.api;

import com.hms.master.entity.BillingHead;
import com.hms.master.service.BillingHeadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/master/billing-heads")
@CrossOrigin(origins = "*")
public class BillingHeadAPI {
    
    @Autowired
    private BillingHeadService service;
    
    @GetMapping
    public ResponseEntity<List<BillingHead>> getAllBillingHeads() {
        return ResponseEntity.ok(service.getAllBillingHeads());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<BillingHead> getBillingHeadById(@PathVariable Long id) {
        return service.getBillingHeadById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<BillingHead> createBillingHead(@RequestBody BillingHead billingHead) {
        try {
            return ResponseEntity.ok(service.createBillingHead(billingHead));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create billing head: " + e.getMessage(), e);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<BillingHead> updateBillingHead(@PathVariable Long id, @RequestBody BillingHead billingHead) {
        try {
            return ResponseEntity.ok(service.updateBillingHead(id, billingHead));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBillingHead(@PathVariable Long id) {
        try {
            service.deleteBillingHead(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<BillingHead>> searchBillingHeads(@RequestParam String billingHeadName) {
        return ResponseEntity.ok(service.searchBillingHeads(billingHeadName));
    }
}