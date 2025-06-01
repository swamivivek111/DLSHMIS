package com.hms.master.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hms.master.dto.DepartmentDTO;
import com.hms.master.entity.Department;
import com.hms.master.exception.HMSException;

public interface DepartmentService {

    DepartmentDTO getById(Long departmentId) throws HMSException;

    List<DepartmentDTO> getAllDepartment(Long hospitalId);

    List<DepartmentDTO> findByHospitalId(Long hospitalId);

    Long createDepartment(DepartmentDTO departmentDTO);

    DepartmentDTO updateDepartment(Long id, DepartmentDTO departmentDTO) throws HMSException;

    void deleteDepartment(Long id) throws HMSException;

    public Page<Department> findAll(String search, Pageable pageable);

}
