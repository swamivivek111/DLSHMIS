package com.hms.master.service;

import com.hms.master.entity.Doctor;
import com.hms.master.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public Page<Doctor> findAll(String search, Pageable pageable) {
        if (search != null && !search.isEmpty()) {
            return doctorRepository.findByNameContainingIgnoreCase(search, pageable);
        }
        return doctorRepository.findAll(pageable);
    }

    @Override
    public Doctor save(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @Override
    public Doctor findById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteById(Long id) {
        doctorRepository.deleteById(id);
    }
}