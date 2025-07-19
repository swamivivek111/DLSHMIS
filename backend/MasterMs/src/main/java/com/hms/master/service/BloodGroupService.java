package com.hms.master.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hms.master.dto.BloodGroupDTO;
import com.hms.master.entity.BloodGroup;
import com.hms.master.exception.HMSException;

public interface BloodGroupService {

    BloodGroupDTO getByBloodGroupId(Long bloodGroupId) throws HMSException;

    List<BloodGroupDTO> getAllBloodGroup(Long bloodGroupId);

    List<BloodGroupDTO> findByBloodGroupId(Long bloodGroupId);

    Long createBloodGroup(BloodGroupDTO bloodGroupDTO);

    BloodGroupDTO updateBloodGroup(Long bloodGroupId, BloodGroupDTO bloodGroupDTO) throws HMSException;

    void deleteBloodGroup(Long bloodGroupId) throws HMSException;

    public Page<BloodGroup> findAll(String search, Pageable pageable);

}
