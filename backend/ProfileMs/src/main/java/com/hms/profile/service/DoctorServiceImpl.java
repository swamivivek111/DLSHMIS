package com.hms.profile.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.profile.dto.DoctorDTO;
import com.hms.profile.entity.Doctor;
import com.hms.profile.dto.DoctorDTO;
import com.hms.profile.exception.HMSException;
import com.hms.profile.repository.DoctorRepository;
@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    DoctorRepository doctorRepository;

    @Override
    public Long addDoctor(DoctorDTO doctorDTO) throws HMSException {
        if(doctorDTO.getEmail()!=null && doctorRepository.findByEmail(doctorDTO.getEmail()).isPresent())throw new HMSException("DOCTOR_ALREADY_EXISTS");
        if(doctorDTO.getLicenseNo()!=null && doctorRepository.findByLicenseNo(doctorDTO.getLicenseNo()).isPresent())throw new HMSException("DOCTOR_ALREADY_EXISTS");
        return doctorRepository.save(doctorDTO.toEntity()).getId();
    }

    @Override
    public DoctorDTO getDoctorById(Long id) throws HMSException {
        return doctorRepository.findById(id).orElseThrow(()-> new UnsupportedOperationException("DOCTOR_NOT_FOUND")).toDTO();
    }

    @Override
    public DoctorDTO updateDoctor(DoctorDTO doctorDTO) throws HMSException {
        doctorRepository.findById(doctorDTO.getId()).orElseThrow(()->new HMSException("PATIENT_NOT_FOUND"));
        return doctorRepository.save(doctorDTO.toEntity()).toDTO();
    }

    @Override
    public boolean exitDoctorById(Long id) throws HMSException {
        return doctorRepository.existsById(id);
    }

    @Override
    public List<Doctor> getAllDoctors(){
        Iterable<Doctor> iterableDoctors = doctorRepository.findAll();
        return StreamSupport.stream(iterableDoctors.spliterator(), false)
        .collect(Collectors.toList());
    }
    
}
