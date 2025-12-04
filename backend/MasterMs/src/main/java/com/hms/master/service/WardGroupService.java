package com.hms.master.service;

import com.hms.master.entity.WardGroup;
import com.hms.master.repository.WardGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class WardGroupService {
    
    @Autowired
    private WardGroupRepository repository;
    
    public List<WardGroup> getAllWardGroups() {
        return repository.findAll();
    }
    
    public Optional<WardGroup> getWardGroupById(Long id) {
        return repository.findById(id);
    }
    
    public WardGroup createWardGroup(WardGroup wardGroup) {
        if (repository.existsByWardGroupName(wardGroup.getWardGroupName())) {
            throw new RuntimeException("Ward group name already exists");
        }
        return repository.save(wardGroup);
    }
    
    public WardGroup updateWardGroup(Long id, WardGroup wardGroupDetails) {
        WardGroup wardGroup = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Ward group not found"));
        
        wardGroup.setWardGroupName(wardGroupDetails.getWardGroupName());
        wardGroup.setWardGroupCategory(wardGroupDetails.getWardGroupCategory());
        wardGroup.setIsActive(wardGroupDetails.getIsActive());
        return repository.save(wardGroup);
    }
    
    public void deleteWardGroup(Long id) {
        WardGroup wardGroup = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Ward group not found"));
        wardGroup.setIsActive(false);
        repository.save(wardGroup);
    }
    
    public List<WardGroup> searchWardGroups(String wardGroupName) {
        return repository.searchWardGroups(wardGroupName);
    }
}