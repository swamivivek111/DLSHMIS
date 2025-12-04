package com.hms.master.service;

import com.hms.master.entity.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DoctorService {
    Page<Doctor> findAll(String search, Pageable pageable);
    Doctor save(Doctor doctor);
    Doctor findById(Long id);
    void deleteById(Long id);
}