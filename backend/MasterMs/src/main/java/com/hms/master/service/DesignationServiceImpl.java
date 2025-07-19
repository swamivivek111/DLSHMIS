package com.hms.master.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hms.master.dto.DesignationDTO;
import com.hms.master.entity.Designation;
import com.hms.master.exception.HMSException;
import com.hms.master.repository.DesignationRepository;

@Service
public class DesignationServiceImpl implements DesignationService{
    
    @Autowired
    private DesignationRepository designationRepository;
    
    @Autowired 
	private APIService apiService;

    @Override
    public DesignationDTO getByDesignationId(Long designationId) throws HMSException {
        return designationRepository.findById(designationId).orElseThrow(() -> new HMSException("COUNTRY_NOT_FOUND")).toDTO();
    }

    @Override
    public List<DesignationDTO> findByDesignationId(Long designationId) {
        return designationRepository.findById(designationId).stream().map(Designation::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<DesignationDTO> getAllDesignation(Long designationId) {
        List<Designation> designations = (designationId != null)
        ? designationRepository.findByDesignationId(designationId)
        : (List<Designation>) designationRepository.findAll();
        return designations.stream().map(Designation::toDTO).collect(Collectors.toList());
    }

    @Override
    public Long createDesignation(DesignationDTO designationDTO) {
        Designation designation = designationDTO.toEntity();
        designation.setCreatedAt(LocalDateTime.now()); 
        designation = designationRepository.save(designation);
        return designation.toDTO().getDesignationId();
    }

    @Override
    public DesignationDTO updateDesignation(Long id, DesignationDTO designationDTO) throws HMSException {
        Designation existingDesignation = designationRepository.findById(id).orElseThrow(() -> new HMSException("DEPARTMENT_NOT_FOUND"));
            existingDesignation.setDesignationName(designationDTO.getDesignationName());
            existingDesignation.setDescription(designationDTO.getDescription());
            existingDesignation.setDesignationCode(designationDTO.getDesignationCode());
            existingDesignation.setUpdatedBy(designationDTO.getUpdatedBy());
            existingDesignation.setActive(designationDTO.getActive());
            existingDesignation.setUpdatedAt(LocalDateTime.now());
        Designation updatedDesignation = designationRepository.save(existingDesignation);
        return updatedDesignation.toDTO();
    }

    @Override
    public void deleteDesignation(Long id) throws HMSException {
        if (!designationRepository.existsById(id)) {
            throw new HMSException("DESIGNATION_NOT_FOUND");
        }
        designationRepository.deleteById(id);
    }

    @Override
    public Page<Designation> findAll(String search, Pageable pageable) {
        if (search == null || search.isBlank()) {
            return designationRepository.findAll(pageable);
        }
        return designationRepository.findByDesignationNameContainingIgnoreCase(search, pageable);
    }

   
}
