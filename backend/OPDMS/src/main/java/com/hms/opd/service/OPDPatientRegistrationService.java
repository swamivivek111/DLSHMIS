package com.hms.opd.service;

import com.hms.opd.entity.OPDPatientRegistration;
import com.hms.opd.repository.OPDPatientRegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OPDPatientRegistrationService {
    
    @Autowired
    private OPDPatientRegistrationRepository repository;
    
    public List<OPDPatientRegistration> getAllRegistrations() {
        return repository.findAll();
    }
    
    public Optional<OPDPatientRegistration> getRegistrationById(Long id) {
        return repository.findById(id);
    }
    

    
    public OPDPatientRegistration createRegistration(OPDPatientRegistration registration) {
        if (registration.getPrnNumber() == null || registration.getPrnNumber().isEmpty()) {
            registration.setPrnNumber(generatePrnNumber());
        }
        return repository.save(registration);
    }
    
    public OPDPatientRegistration updateRegistration(Long id, OPDPatientRegistration registration) {
        if (repository.existsById(id)) {
            registration.setId(id);
            return repository.save(registration);
        }
        throw new RuntimeException("Registration not found with id: " + id);
    }
    
    public void deleteRegistration(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Registration not found with id: " + id);
        }
    }
    

    
    private String generatePrnNumber() {
        Integer maxNumber = repository.findMaxPatientNumber();
        int nextNumber = (maxNumber != null ? maxNumber : 0) + 1;
        return String.format("PRN%06d", nextNumber);
    }
    

    
    public boolean isMobileExists(String mobile) {
        return repository.existsByMobile(mobile);
    }
    
    public Optional<OPDPatientRegistration> getRegistrationByPrn(String prnNumber) {
        return repository.findByPrnNumber(prnNumber);
    }
}