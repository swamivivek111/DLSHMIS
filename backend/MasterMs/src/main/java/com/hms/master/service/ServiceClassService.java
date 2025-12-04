package com.hms.master.service;

import com.hms.master.entity.ServiceClass;
import com.hms.master.repository.ServiceClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceClassService {
    
    @Autowired
    private ServiceClassRepository repository;
    
    public List<ServiceClass> getAllServiceClasses() {
        return repository.findAll();
    }
    
    public Optional<ServiceClass> getServiceClassById(Long id) {
        return repository.findById(id);
    }
    
    public ServiceClass createServiceClass(ServiceClass serviceClass) {
        if (repository.existsByServiceClassName(serviceClass.getServiceClassName())) {
            throw new RuntimeException("Service class name already exists");
        }
        return repository.save(serviceClass);
    }
    
    public ServiceClass updateServiceClass(Long id, ServiceClass serviceClassDetails) {
        ServiceClass serviceClass = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Service class not found"));
        
        serviceClass.setServiceClassName(serviceClassDetails.getServiceClassName());
        serviceClass.setIsActive(serviceClassDetails.getIsActive());
        return repository.save(serviceClass);
    }
    
    public void deleteServiceClass(Long id) {
        ServiceClass serviceClass = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Service class not found"));
        serviceClass.setIsActive(false);
        repository.save(serviceClass);
    }
    
    public List<ServiceClass> searchServiceClasses(String serviceClassName) {
        return repository.searchServiceClasses(serviceClassName);
    }
}