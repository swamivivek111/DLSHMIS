package com.hms.master.service;

import com.hms.master.entity.ReferralType;
import com.hms.master.repository.ReferralTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReferralTypeService {
    
    @Autowired
    private ReferralTypeRepository repository;
    
    public List<ReferralType> getAllReferralTypes() {
        return repository.findAll();
    }
    
    public Optional<ReferralType> getReferralTypeById(Long id) {
        return repository.findById(id);
    }
    
    public ReferralType createReferralType(ReferralType referralType) {
        return repository.save(referralType);
    }
    
    public ReferralType updateReferralType(Long id, ReferralType referralType) {
        if (repository.existsById(id)) {
            referralType.setReferralTypeId(id);
            return repository.save(referralType);
        }
        throw new RuntimeException("Referral type not found with id: " + id);
    }
    
    public void deleteReferralType(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Referral type not found with id: " + id);
        }
    }
    
    public List<ReferralType> searchReferralTypes(String referralTypeName) {
        return repository.findByReferralTypeNameContainingIgnoreCase(referralTypeName);
    }
}