package com.hms.master.service;

import com.hms.master.entity.BillingHead;
import com.hms.master.repository.BillingHeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BillingHeadService {
    
    @Autowired
    private BillingHeadRepository repository;
    
    public List<BillingHead> getAllBillingHeads() {
        return repository.findAll();
    }
    
    public Optional<BillingHead> getBillingHeadById(Long id) {
        return repository.findById(id);
    }
    
    public BillingHead createBillingHead(BillingHead billingHead) {
        if (repository.existsByBillingHeadName(billingHead.getBillingHeadName())) {
            throw new RuntimeException("Billing head name already exists");
        }
        return repository.save(billingHead);
    }
    
    public BillingHead updateBillingHead(Long id, BillingHead billingHeadDetails) {
        BillingHead billingHead = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Billing head not found"));
        
        billingHead.setBillingHeadName(billingHeadDetails.getBillingHeadName());
        billingHead.setIsActive(billingHeadDetails.getIsActive());
        return repository.save(billingHead);
    }
    
    public void deleteBillingHead(Long id) {
        BillingHead billingHead = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Billing head not found"));
        billingHead.setIsActive(false);
        repository.save(billingHead);
    }
    
    public List<BillingHead> searchBillingHeads(String billingHeadName) {
        return repository.searchBillingHeads(billingHeadName);
    }
}