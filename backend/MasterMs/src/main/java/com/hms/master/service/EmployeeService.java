package com.hms.master.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hms.master.dto.EmployeeDTO;
import com.hms.master.entity.Employee;
import com.hms.master.exception.HMSException;

public interface EmployeeService {

    EmployeeDTO getById(Long employeeId) throws HMSException;

    List<EmployeeDTO> getAllEmployee(Long employeeId);

    List<EmployeeDTO> findByDepartmentId(Long employeeId);

    Long createEmployee(EmployeeDTO employeeDTO);

    EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) throws HMSException;

    void deleteEmployee(Long id) throws HMSException;

    public Page<Employee> findAll(String search, Pageable pageable);

}
