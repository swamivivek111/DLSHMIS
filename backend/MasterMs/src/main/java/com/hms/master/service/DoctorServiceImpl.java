package com.hms.master.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hms.master.dto.DepartmentDTO;
import com.hms.master.dto.DoctorDTO;
import com.hms.master.entity.Department;
import com.hms.master.entity.Doctor;
import com.hms.master.exception.HMSException;
import com.hms.master.repository.DoctorRepository;

@Service
public class DoctorServiceImpl implements DoctorService{
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired 
	private APIService apiService;

    @Override
    public DoctorDTO getById(Long doctorId) throws HMSException {
        return doctorRepository.findById(doctorId).orElseThrow(() -> new HMSException("DOCTOR_NOT_FOUND")).toDTO();
    }

   @Override
    public List<DoctorDTO> findByDepartmentId(Long departmentId) {
        return doctorRepository.findByDepartmentId(departmentId).stream().map(Doctor::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<DoctorDTO> getAllDoctor(Long doctorId) {
        List<Doctor> doctors = (doctorId != null)
        ? doctorRepository.findByDoctorId(doctorId)
        : (List<Doctor>) doctorRepository.findAll();
        return doctors.stream().map(Doctor::toDTO).collect(Collectors.toList());
    }

    @Override
    public Long createDoctor(DoctorDTO doctorDTO) {
        doctorDTO.setCreatedAt(LocalDateTime.now());
        Doctor doctor = doctorDTO.toEntity();
        doctor = doctorRepository.save(doctor);
        return doctor.toDTO().getDoctorId();
    }

    @Override
    public DoctorDTO updateDoctor(Long id, DoctorDTO doctorDTO) throws HMSException {
        Doctor existingDoctor = doctorRepository.findById(id).orElseThrow(() -> new HMSException("DOCTOR_NOT_FOUND"));
            existingDoctor.setCode(doctorDTO.getCode());
            existingDoctor.setType(doctorDTO.getType());
            existingDoctor.setName(doctorDTO.getName());
            existingDoctor.setSpecialization(doctorDTO.getSpecialization());
            existingDoctor.setDepartmentId(doctorDTO.getDepartmentId());
            existingDoctor.setQualification(doctorDTO.getQualification());
            existingDoctor.setEmailId(doctorDTO.getEmailId());
            existingDoctor.setContactNumber(doctorDTO.getContactNumber());
            existingDoctor.setFirstConsultationFees(doctorDTO.getFirstConsultationFees());
            existingDoctor.setFollowUpFees(doctorDTO.getFollowUpFees());
            existingDoctor.setJoiningDate(doctorDTO.getJoiningDate());
            existingDoctor.setPanno(doctorDTO.getPanno());
            existingDoctor.setAddress(doctorDTO.getAddress());     
            existingDoctor.setCity(doctorDTO.getCity());
            existingDoctor.setDistrict(doctorDTO.getDistrict());
            existingDoctor.setDoctorShare(doctorDTO.getDoctorShare());
            existingDoctor.setUpdatedBy(doctorDTO.getUpdatedBy());
            existingDoctor.setActive(doctorDTO.getActive());
            existingDoctor.setUpdatedAt(LocalDateTime.now());
        Doctor updatedDoctor = doctorRepository.save(existingDoctor);
        return updatedDoctor.toDTO();
    }
 
    @Override
    public void deleteDoctor(Long id) throws HMSException {
        if (!doctorRepository.existsById(id)) {
            throw new HMSException("DOCTOR_NOT_FOUND");
        }
        doctorRepository.deleteById(id);
    }

    @Override
    public Page<Doctor> findAll(String search, Pageable pageable) {
        if (search == null || search.isBlank()) {
            return doctorRepository.findAll(pageable);
        }
        return doctorRepository.findByNameContainingIgnoreCase(search, pageable);
    }

   
}
