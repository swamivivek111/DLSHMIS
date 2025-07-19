package com.hms.master.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hms.master.dto.BloodGroupDTO;
import com.hms.master.entity.BloodGroup;
import com.hms.master.exception.HMSException;
import com.hms.master.repository.BloodGroupRepository;

@Service
public class BloodGroupServiceImpl implements BloodGroupService{
    
    @Autowired
    private BloodGroupRepository bloodGroupRepository;
    
    @Autowired 
	private APIService apiService;

    @Override
    public BloodGroupDTO getByBloodGroupId(Long bloodGroupId) throws HMSException {
        return bloodGroupRepository.findById(bloodGroupId).orElseThrow(() -> new HMSException("COUNTRY_NOT_FOUND")).toDTO();
    }

    @Override
    public List<BloodGroupDTO> findByBloodGroupId(Long bloodGroupId) {
        return bloodGroupRepository.findById(bloodGroupId).stream().map(BloodGroup::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<BloodGroupDTO> getAllBloodGroup(Long bloodGroupId) {
        List<BloodGroup> bloodGroups = (bloodGroupId != null)
        ? bloodGroupRepository.findByBloodGroupId(bloodGroupId)
        : (List<BloodGroup>) bloodGroupRepository.findAll();
        return bloodGroups.stream().map(BloodGroup::toDTO).collect(Collectors.toList());
    }

    @Override
    public Long createBloodGroup(BloodGroupDTO bloodGroupDTO) {
        BloodGroup bloodGroup = bloodGroupDTO.toEntity();
        bloodGroup.setCreatedAt(LocalDateTime.now()); 
        bloodGroup = bloodGroupRepository.save(bloodGroup);
        return bloodGroup.toDTO().getBloodGroupId();
    }

    @Override
    public BloodGroupDTO updateBloodGroup(Long id, BloodGroupDTO bloodGroupDTO) throws HMSException {
        BloodGroup existingBloodGroup = bloodGroupRepository.findById(id).orElseThrow(() -> new HMSException("DEPARTMENT_NOT_FOUND"));
            existingBloodGroup.setBloodGroup(bloodGroupDTO.getBloodGroup());
            existingBloodGroup.setActive(bloodGroupDTO.getActive());
            existingBloodGroup.setUpdatedBy(bloodGroupDTO.getUpdatedBy());
            existingBloodGroup.setUpdatedAt(LocalDateTime.now());
        BloodGroup updatedBloodGroup = bloodGroupRepository.save(existingBloodGroup);
        return updatedBloodGroup.toDTO();
    }

    @Override
    public void deleteBloodGroup(Long id) throws HMSException {
        if (!bloodGroupRepository.existsById(id)) {
            throw new HMSException("BLOODGROUP_NOT_FOUND");
        }
        bloodGroupRepository.deleteById(id);
    }

    @Override
    public Page<BloodGroup> findAll(String search, Pageable pageable) {
        if (search == null || search.isBlank()) {
            return bloodGroupRepository.findAll(pageable);
        }
        return bloodGroupRepository.findByBloodGroupContainingIgnoreCase(search, pageable);
    }

   
}
