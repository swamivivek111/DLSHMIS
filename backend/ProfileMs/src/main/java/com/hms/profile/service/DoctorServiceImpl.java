package com.hms.profile.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hms.profile.dto.DoctorDTO;
import com.hms.profile.entity.Doctor;
import com.hms.profile.exception.HMSException;
import com.hms.profile.repository.DoctorRepository;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    DoctorRepository doctorRepository;

    @Override
    public Long addDoctor(DoctorDTO doctorDTO) throws HMSException {
        if(doctorDTO.getEmailId()!=null && doctorRepository.findByEmailId(doctorDTO.getEmailId()).isPresent())
            throw new HMSException("DOCTOR_ALREADY_EXISTS");
        return doctorRepository.save(doctorDTO.toEntity()).getDoctorId();
    }

    @Override
    public DoctorDTO getDoctorById(Long id) throws HMSException {
        return convertToDTO(doctorRepository.findById(id)
            .orElseThrow(() -> new HMSException("DOCTOR_NOT_FOUND")));
    }

    @Override
    public DoctorDTO updateDoctor(Long id, DoctorDTO doctorDTO) throws HMSException {
        Doctor existing = doctorRepository.findById(id)
            .orElseThrow(() -> new HMSException("DOCTOR_NOT_FOUND"));
        
        existing.setCode(doctorDTO.getCode());
        existing.setType(doctorDTO.getType());
        existing.setName(doctorDTO.getName());
        existing.setSpecialization(doctorDTO.getSpecialization());
        existing.setDepartmentId(doctorDTO.getDepartmentId());
        existing.setQualification(doctorDTO.getQualification());
        existing.setEmailId(doctorDTO.getEmailId());
        existing.setContactNumber(doctorDTO.getContactNumber());
        existing.setFirstConsultationFees(doctorDTO.getFirstConsultationFees());
        existing.setFollowUpFees(doctorDTO.getFollowUpFees());
        existing.setJoiningDate(doctorDTO.getJoiningDate());
        existing.setPanno(doctorDTO.getPanno());
        existing.setAddress(doctorDTO.getAddress());
        existing.setCityId(doctorDTO.getCityId());
        existing.setDistrictId(doctorDTO.getDistrictId());
        existing.setDoctorShare(doctorDTO.getDoctorShare());
        existing.setHospitalId(doctorDTO.getHospitalId());
        existing.setUpdatedBy(doctorDTO.getUpdatedBy());
        
        return convertToDTO(doctorRepository.save(existing));
    }

    @Override
    public void deleteDoctor(Long id) throws HMSException {
        if (!doctorRepository.existsById(id)) {
            throw new HMSException("DOCTOR_NOT_FOUND");
        }
        doctorRepository.deleteById(id);
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

    @Override
    public Page<Doctor> findAll(String search, Pageable pageable) {
        if (search != null && !search.trim().isEmpty()) {
            return doctorRepository.findByNameContainingIgnoreCase(search.trim(), pageable);
        }
        return doctorRepository.findAll(pageable);
    }
    
    private DoctorDTO convertToDTO(Doctor doctor) {
        DoctorDTO dto = new DoctorDTO();
        dto.setDoctorId(doctor.getDoctorId());
        dto.setCode(doctor.getCode());
        dto.setType(doctor.getType());
        dto.setName(doctor.getName());
        dto.setSpecialization(doctor.getSpecialization());
        dto.setDepartmentId(doctor.getDepartmentId());
        dto.setQualification(doctor.getQualification());
        dto.setEmailId(doctor.getEmailId());
        dto.setContactNumber(doctor.getContactNumber());
        dto.setFirstConsultationFees(doctor.getFirstConsultationFees());
        dto.setFollowUpFees(doctor.getFollowUpFees());
        dto.setJoiningDate(doctor.getJoiningDate());
        dto.setPanno(doctor.getPanno());
        dto.setAddress(doctor.getAddress());
        dto.setCityId(doctor.getCityId());
        dto.setDistrictId(doctor.getDistrictId());
        dto.setDoctorShare(doctor.getDoctorShare());
        dto.setHospitalId(doctor.getHospitalId());
        dto.setActive(doctor.getActive());
        dto.setCreatedBy(doctor.getCreatedBy());
        dto.setUpdatedBy(doctor.getUpdatedBy());
        dto.setCreatedAt(doctor.getCreatedAt());
        dto.setUpdatedAt(doctor.getUpdatedAt());
        return dto;
    }
}
