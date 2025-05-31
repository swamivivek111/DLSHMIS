package com.hms.master.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.master.entity.Department;

@Repository
public interface DepartmentRepository extends CrudRepository<Department, Long>{

List<Department> findByHospitalId(Long hospitalId);
    
}