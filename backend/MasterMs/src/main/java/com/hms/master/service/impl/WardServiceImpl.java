package com.hms.master.service.impl;

import com.hms.master.entity.Ward;
import com.hms.master.repository.WardRepository;
import com.hms.master.service.WardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WardServiceImpl implements WardService {

    @Autowired
    private WardRepository wardRepository;

    @Override
    public Ward addWard(Ward ward) {
        // Set department name based on department ID
        if (ward.getDepartmentId() != null) {
            // You can fetch department name from department service here
            // For now, we'll let the frontend handle it
        }
        return wardRepository.save(ward);
    }

    @Override
    public Ward updateWard(Long id, Ward ward) {
        Ward existingWard = wardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ward not found with id: " + id));
        
        existingWard.setWardName(ward.getWardName());
        existingWard.setWardType(ward.getWardType());
        existingWard.setFloorNo(ward.getFloorNo());
        existingWard.setBlockBuildingName(ward.getBlockBuildingName());
        existingWard.setDescription(ward.getDescription());
        existingWard.setDepartmentId(ward.getDepartmentId());
        existingWard.setDepartmentName(ward.getDepartmentName());
        existingWard.setStatus(ward.getStatus());
        
        return wardRepository.save(existingWard);
    }

    @Override
    public Ward getWardById(Long id) {
        return wardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ward not found with id: " + id));
    }

    @Override
    public void deleteWard(Long id) {
        if (!wardRepository.existsById(id)) {
            throw new RuntimeException("Ward not found with id: " + id);
        }
        wardRepository.deleteById(id);
    }

    @Override
    public Page<Ward> getAllWards(int page, int limit, String search) {
        Pageable pageable = PageRequest.of(page, limit);
        return wardRepository.findAllWithSearch(search, pageable);
    }

    @Override
    public List<Ward> getAllWards() {
        return wardRepository.findAll();
    }
}