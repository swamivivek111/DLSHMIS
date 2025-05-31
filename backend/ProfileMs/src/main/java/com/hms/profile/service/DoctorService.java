package com.hms.profile.service;

import java.util.List;

import com.hms.profile.dto.DoctorDTO;
import com.hms.profile.entity.Doctor;
import com.hms.profile.dto.DoctorDTO;
import com.hms.profile.exception.HMSException;

public interface DoctorService {
    public Long addDoctor(DoctorDTO doctorDTO)throws HMSException;
    public DoctorDTO getDoctorById(Long id)throws HMSException;
    public DoctorDTO updateDoctor(DoctorDTO doctorDTO)throws HMSException;
    public boolean exitDoctorById(Long id) throws HMSException;
    public List<Doctor> getAllDoctors();
}
