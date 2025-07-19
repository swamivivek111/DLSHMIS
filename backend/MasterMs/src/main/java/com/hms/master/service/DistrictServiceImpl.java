package com.hms.master.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hms.master.dto.DistrictDTO;
import com.hms.master.entity.District;
import com.hms.master.exception.HMSException;
import com.hms.master.repository.DistrictRepository;

@Service
public class DistrictServiceImpl implements DistrictService{
    
    @Autowired
    private DistrictRepository districtRepository;
    
    @Autowired 
	private APIService apiService;

    @Override
    public DistrictDTO getByDistrictId(Long districtId) throws HMSException {
        return districtRepository.findById(districtId).orElseThrow(() -> new HMSException("COUNTRY_NOT_FOUND")).toDTO();
    }

    @Override
    public List<DistrictDTO> findByDistrictId(Long districtId) {
        return districtRepository.findById(districtId).stream().map(District::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<DistrictDTO> getAllDistrict(Long districtId) {
        List<District> districts = (districtId != null)
        ? districtRepository.findByDistrictId(districtId)
        : (List<District>) districtRepository.findAll();
        return districts.stream().map(District::toDTO).collect(Collectors.toList());
    }

    @Override
    public Long createDistrict(DistrictDTO districtDTO) {
        District district = districtDTO.toEntity();
        district.setCreatedAt(LocalDateTime.now()); 
        district = districtRepository.save(district);
        return district.toDTO().getDistrictId();
    }

    @Override
    public DistrictDTO updateDistrict(Long id, DistrictDTO districtDTO) throws HMSException {
        District existingDistrict = districtRepository.findById(id).orElseThrow(() -> new HMSException("DEPARTMENT_NOT_FOUND"));
            existingDistrict.setStateId(districtDTO.getStateId());
            existingDistrict.setDistrictName(districtDTO.getDistrictName());
            existingDistrict.setDistrictCode(districtDTO.getDistrictCode());
            existingDistrict.setUpdatedBy(districtDTO.getUpdatedBy());
            existingDistrict.setActive(districtDTO.getActive());
            existingDistrict.setUpdatedAt(LocalDateTime.now());
        District updatedDistrict = districtRepository.save(existingDistrict);
        return updatedDistrict.toDTO();
    }

    @Override
    public void deleteDistrict(Long id) throws HMSException {
        if (!districtRepository.existsById(id)) {
            throw new HMSException("STATE_NOT_FOUND");
        }
        districtRepository.deleteById(id);
    }

    @Override
    public Page<District> findAll(String search, Pageable pageable) {
        if (search == null || search.isBlank()) {
            return districtRepository.findAll(pageable);
        }
        return districtRepository.findByDistrictNameContainingIgnoreCase(search, pageable);
    }

   
}
