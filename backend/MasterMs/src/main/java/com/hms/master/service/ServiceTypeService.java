package com.hms.master.service;

import com.hms.master.entity.ServiceType;
import com.hms.master.repository.ServiceTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceTypeService {
    
    @Autowired
    private ServiceTypeRepository repository;
    
    public List<ServiceType> getAllServiceTypes() {
        return repository.findAll();
    }
    
    public Optional<ServiceType> getServiceTypeById(Long id) {
        return repository.findById(id);
    }
    
    public ServiceType createServiceType(ServiceType serviceType) {
        return repository.save(serviceType);
    }
    
    public ServiceType updateServiceType(Long id, ServiceType serviceType) {
        if (repository.existsById(id)) {
            serviceType.setServiceTypeId(id);
            return repository.save(serviceType);
        }
        throw new RuntimeException("Service type not found with id: " + id);
    }
    
    public void deleteServiceType(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Service type not found with id: " + id);
        }
    }
    
    public List<ServiceType> getByServiceClass(Long serviceClassName) {
        return repository.findByServiceClassName(serviceClassName);
    }
}