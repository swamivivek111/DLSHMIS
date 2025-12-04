package com.hms.master.service;

import com.hms.master.entity.ConsultationCharges;
import com.hms.master.repository.ConsultationChargesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ConsultationChargesService {
    
    @Autowired
    private ConsultationChargesRepository repository;
    
    public List<ConsultationCharges> getAllConsultationCharges() {
        return repository.findAll();
    }
    
    public Optional<ConsultationCharges> getConsultationChargesById(Long id) {
        return repository.findById(id);
    }
    
    public ConsultationCharges createConsultationCharges(ConsultationCharges consultationCharges) {
        return repository.save(consultationCharges);
    }
    
    public ConsultationCharges updateConsultationCharges(Long id, ConsultationCharges consultationCharges) {
        if (repository.existsById(id)) {
            consultationCharges.setId(id);
            return repository.save(consultationCharges);
        }
        throw new RuntimeException("Consultation charges not found with id: " + id);
    }
    
    public void deleteConsultationCharges(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Consultation charges not found with id: " + id);
        }
    }
    
    public List<ConsultationCharges> getByDepartment(Long departmentId) {
        return repository.findByDepartmentId(departmentId);
    }
    
    public List<ConsultationCharges> getByDoctor(Long doctorId) {
        return repository.findByDoctorId(doctorId);
    }
}