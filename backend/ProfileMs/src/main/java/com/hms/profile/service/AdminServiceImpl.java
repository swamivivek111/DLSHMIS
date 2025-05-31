package com.hms.profile.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.profile.dto.AdminDTO;
import com.hms.profile.exception.HMSException;
import com.hms.profile.repository.AdminRepository;
@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    AdminRepository adminRepository;

    @Override
    public Long addAdmin(AdminDTO adminDTO) throws HMSException {
        if(adminDTO.getEmail()!=null && adminRepository.findByEmail(adminDTO.getEmail()).isPresent())throw new HMSException("ADMIN_ALREADY_EXISTS");
        if(adminDTO.getAadharNo()!=null && adminRepository.findByAadharNo(adminDTO.getAadharNo()).isPresent())throw new HMSException("ADMIN_ALREADY_EXISTS");
        return adminRepository.save(adminDTO.toEntity()).getId();
    }

    @Override
    public AdminDTO getAdminById(Long id) throws HMSException {
        return adminRepository.findById(id).orElseThrow(()->new HMSException("PATIENT_NOT_FOUND")).toDTO();
    }

    @Override
    public AdminDTO updateAdmin(AdminDTO adminDTO) throws HMSException {
        adminRepository.findById(adminDTO.getId()).orElseThrow(()->new HMSException("PATIENT_NOT_FOUND"));
        return adminRepository.save(adminDTO.toEntity()).toDTO();
    }

    @Override
    public boolean exitAdminById(Long id) throws HMSException {
        return adminRepository.existsById(id);
    }
    
    
}
