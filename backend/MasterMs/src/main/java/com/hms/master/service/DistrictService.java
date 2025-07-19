package com.hms.master.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hms.master.dto.DistrictDTO;
import com.hms.master.entity.District;
import com.hms.master.exception.HMSException;

public interface DistrictService {

    DistrictDTO getByDistrictId(Long districtId) throws HMSException;

    List<DistrictDTO> getAllDistrict(Long districtId);

    List<DistrictDTO> findByDistrictId(Long districtId);

    Long createDistrict(DistrictDTO districtDTO);

    DistrictDTO updateDistrict(Long districtId, DistrictDTO districtDTO) throws HMSException;

    void deleteDistrict(Long districtId) throws HMSException;

    public Page<District> findAll(String search, Pageable pageable);

}
