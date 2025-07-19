package com.hms.master.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hms.master.dto.DoctorDTO;
import com.hms.master.entity.Doctor;
import com.hms.master.exception.HMSException;

public interface DoctorService {

    DoctorDTO getById(Long doctorId) throws HMSException;

    List<DoctorDTO> getAllDoctor(Long doctorId);

    List<DoctorDTO> findByDepartmentId(Long doctorId);

    Long createDoctor(DoctorDTO doctorDTO);

    DoctorDTO updateDoctor(Long id, DoctorDTO doctorDTO) throws HMSException;

    void deleteDoctor(Long id) throws HMSException;

    public Page<Doctor> findAll(String search, Pageable pageable);

}
