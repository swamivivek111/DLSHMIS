package com.hms.master.service;

import com.hms.master.entity.ServiceSubGroup;
import com.hms.master.repository.ServiceSubGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceSubGroupService {
    
    @Autowired
    private ServiceSubGroupRepository repository;
    
    public List<ServiceSubGroup> getAllServiceSubGroups() {
        return repository.findAll();
    }
    
    public Optional<ServiceSubGroup> getServiceSubGroupById(Long id) {
        return repository.findById(id);
    }
    
    public ServiceSubGroup createServiceSubGroup(ServiceSubGroup serviceSubGroup) {
        if (repository.existsBySubGroupName(serviceSubGroup.getSubGroupName())) {
            throw new RuntimeException("Service sub group name already exists");
        }
        return repository.save(serviceSubGroup);
    }
    
    public ServiceSubGroup updateServiceSubGroup(Long id, ServiceSubGroup serviceSubGroupDetails) {
        ServiceSubGroup serviceSubGroup = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Service sub group not found"));
        
        serviceSubGroup.setGroupId(serviceSubGroupDetails.getGroupId());
        serviceSubGroup.setSubGroupName(serviceSubGroupDetails.getSubGroupName());
        serviceSubGroup.setStatus(serviceSubGroupDetails.getStatus());
        return repository.save(serviceSubGroup);
    }
    
    public void deleteServiceSubGroup(Long id) {
        ServiceSubGroup serviceSubGroup = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Service sub group not found"));
        serviceSubGroup.setStatus(ServiceSubGroup.Status.Inactive);
        repository.save(serviceSubGroup);
    }
    
    public List<ServiceSubGroup> searchServiceSubGroups(String subGroupName) {
        return repository.searchServiceSubGroups(subGroupName);
    }
    
    public List<ServiceSubGroup> getByGroupId(Long groupId) {
        return repository.findByGroupId(groupId);
    }
}