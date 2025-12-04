package com.hms.master.service;

import com.hms.master.dto.HospitalDTO;
import com.hms.master.entity.Hospital;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface HospitalService {
    Long createHospital(HospitalDTO hospitalDTO);
    HospitalDTO updateHospital(Long hospitalId, HospitalDTO hospitalDTO);
    void deleteHospital(Long hospitalId);
    HospitalDTO getById(Long hospitalId);
    Page<Hospital> findAll(String search, Pageable pageable);
}