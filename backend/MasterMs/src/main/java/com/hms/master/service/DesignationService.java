package com.hms.master.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hms.master.dto.DesignationDTO;
import com.hms.master.entity.Designation;
import com.hms.master.exception.HMSException;

public interface DesignationService {

    DesignationDTO getByDesignationId(Long designationId) throws HMSException;

    List<DesignationDTO> getAllDesignation(Long designationId);

    List<DesignationDTO> findByDesignationId(Long designationId);

    Long createDesignation(DesignationDTO designationDTO);

    DesignationDTO updateDesignation(Long designationId, DesignationDTO designationDTO) throws HMSException;

    void deleteDesignation(Long designationId) throws HMSException;

    public Page<Designation> findAll(String search, Pageable pageable);

}
