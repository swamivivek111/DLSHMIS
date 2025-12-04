package com.hms.master.service;

import com.hms.master.entity.ReferralName;
import com.hms.master.repository.ReferralNameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReferralNameService {
    
    @Autowired
    private ReferralNameRepository repository;
    
    public List<ReferralName> getAllReferralNames() {
        return repository.findAll();
    }
    
    public Optional<ReferralName> getReferralNameById(Long id) {
        return repository.findById(id);
    }
    
    public ReferralName createReferralName(ReferralName referralName) {
        return repository.save(referralName);
    }
    
    public ReferralName updateReferralName(Long id, ReferralName referralName) {
        if (repository.existsById(id)) {
            referralName.setReferralNameId(id);
            return repository.save(referralName);
        }
        throw new RuntimeException("Referral name not found with id: " + id);
    }
    
    public void deleteReferralName(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Referral name not found with id: " + id);
        }
    }
    
    public List<ReferralName> getByReferralType(Long referralTypeId) {
        return repository.findByReferralTypeId(referralTypeId);
    }
}