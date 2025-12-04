package com.hms.master.service;

import com.hms.master.entity.ServiceGroup;
import com.hms.master.repository.ServiceGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceGroupService {
    
    @Autowired
    private ServiceGroupRepository repository;
    
    public List<ServiceGroup> getAllServiceGroups() {
        return repository.findAll();
    }
    
    public Optional<ServiceGroup> getServiceGroupById(Long id) {
        return repository.findById(id);
    }
    
    public ServiceGroup createServiceGroup(ServiceGroup serviceGroup) {
        if (repository.existsByGroupName(serviceGroup.getGroupName())) {
            throw new RuntimeException("Service group name already exists");
        }
        return repository.save(serviceGroup);
    }
    
    public ServiceGroup updateServiceGroup(Long id, ServiceGroup serviceGroupDetails) {
        ServiceGroup serviceGroup = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Service group not found"));
        
        serviceGroup.setGroupName(serviceGroupDetails.getGroupName());
        serviceGroup.setDepartmentId(serviceGroupDetails.getDepartmentId());
        serviceGroup.setIsResultRequired(serviceGroupDetails.getIsResultRequired());
        serviceGroup.setStatus(serviceGroupDetails.getStatus());
        return repository.save(serviceGroup);
    }
    
    public void deleteServiceGroup(Long id) {
        ServiceGroup serviceGroup = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Service group not found"));
        serviceGroup.setStatus(ServiceGroup.Status.Inactive);
        repository.save(serviceGroup);
    }
    
    public List<ServiceGroup> searchServiceGroups(String groupName) {
        return repository.searchServiceGroups(groupName);
    }
    
    public List<ServiceGroup> getByDepartmentId(Long departmentId) {
        return repository.findByDepartmentId(departmentId);
    }
}