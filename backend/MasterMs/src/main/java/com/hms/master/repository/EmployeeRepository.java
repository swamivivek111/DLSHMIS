package com.hms.master.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.master.entity.Employee;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long>{
    
List<Employee> findByEmployeeId(Long employeeId);
List<Employee> findByDepartmentId(Long departmentId);
Page<Employee> findByFirstNameContainingIgnoreCase(String name, Pageable pageable);
Page<Employee> findAll(Pageable pageable);
    
}

