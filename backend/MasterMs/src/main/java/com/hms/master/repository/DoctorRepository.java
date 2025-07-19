package com.hms.master.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.master.entity.Doctor;

@Repository
public interface DoctorRepository extends CrudRepository<Doctor, Long>{
    
List<Doctor> findByDoctorId(Long doctorId);
List<Doctor> findByDepartmentId(Long departmentId);
Page<Doctor> findByNameContainingIgnoreCase(String name, Pageable pageable);
Page<Doctor> findAll(Pageable pageable);
    
}

