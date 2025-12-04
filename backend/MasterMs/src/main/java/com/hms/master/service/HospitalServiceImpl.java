package com.hms.master.service;

import com.hms.master.dto.HospitalDTO;
import com.hms.master.entity.Hospital;
import com.hms.master.repository.HospitalRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class HospitalServiceImpl implements HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;

    @Override
    public Long createHospital(HospitalDTO hospitalDTO) {
        if (hospitalRepository.existsByHospitalCode(hospitalDTO.getHospitalCode())) {
            throw new RuntimeException("Hospital code already exists");
        }
        
        Hospital hospital = new Hospital();
        BeanUtils.copyProperties(hospitalDTO, hospital);
        hospital.setCreatedAt(LocalDateTime.now());
        hospital.setUpdatedAt(LocalDateTime.now());
        
        Hospital saved = hospitalRepository.save(hospital);
        return saved.getHospitalId();
    }

    @Override
    public HospitalDTO updateHospital(Long hospitalId, HospitalDTO hospitalDTO) {
        Hospital hospital = hospitalRepository.findById(hospitalId)
            .orElseThrow(() -> new RuntimeException("Hospital not found"));
        
        if (hospitalRepository.existsByHospitalCodeAndHospitalIdNot(hospitalDTO.getHospitalCode(), hospitalId)) {
            throw new RuntimeException("Hospital code already exists");
        }
        
        BeanUtils.copyProperties(hospitalDTO, hospital, "hospitalId", "createdAt", "createdBy");
        hospital.setUpdatedAt(LocalDateTime.now());
        
        Hospital updated = hospitalRepository.save(hospital);
        return convertToDTO(updated);
    }

    @Override
    public void deleteHospital(Long hospitalId) {
        Hospital hospital = hospitalRepository.findById(hospitalId)
            .orElseThrow(() -> new RuntimeException("Hospital not found"));
        hospital.setActive(false);
        hospitalRepository.save(hospital);
    }

    @Override
    public HospitalDTO getById(Long hospitalId) {
        Hospital hospital = hospitalRepository.findById(hospitalId)
            .orElseThrow(() -> new RuntimeException("Hospital not found"));
        return convertToDTO(hospital);
    }

    @Override
    public Page<Hospital> findAll(String search, Pageable pageable) {
        return hospitalRepository.findBySearchTerm(search, pageable);
    }

    private HospitalDTO convertToDTO(Hospital hospital) {
        HospitalDTO dto = new HospitalDTO();
        BeanUtils.copyProperties(hospital, dto);
        return dto;
    }
}