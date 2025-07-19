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
import com.hms.master.dto.EmployeeDTO;
import com.hms.master.entity.Department;
import com.hms.master.entity.Employee;
import com.hms.master.exception.HMSException;
import com.hms.master.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService{
    
    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Autowired 
	private APIService apiService;

    @Override
    public EmployeeDTO getById(Long employeeId) throws HMSException {
        return employeeRepository.findById(employeeId).orElseThrow(() -> new HMSException("DOCTOR_NOT_FOUND")).toDTO();
    }

   @Override
    public List<EmployeeDTO> findByDepartmentId(Long departmentId) {
        return employeeRepository.findByDepartmentId(departmentId).stream().map(Employee::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<EmployeeDTO> getAllEmployee(Long employeeId) {
        List<Employee> employee = (employeeId != null)
        ? employeeRepository.findByEmployeeId(employeeId)
        : (List<Employee>) employeeRepository.findAll();
        return employee.stream().map(Employee::toDTO).collect(Collectors.toList());
    }

    @Override
    public Long createEmployee(EmployeeDTO employeeDTO) {
        Employee employee = employeeDTO.toEntity();
        employee.setCreatedAt(LocalDateTime.now()); 
        employee = employeeRepository.save(employee);
        return employee.toDTO().getEmployeeId();
    }

    @Override
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) throws HMSException {
        Employee existingEmployee = employeeRepository.findById(id).orElseThrow(() -> new HMSException("DOCTOR_NOT_FOUND"));
            existingEmployee.setEmployeeCode(employeeDTO.getEmployeeCode());
            existingEmployee.setTitleId(employeeDTO.getTitleId());
            existingEmployee.setFirstName(employeeDTO.getFirstName());
            existingEmployee.setMiddleName(employeeDTO.getMiddleName());
            existingEmployee.setLastName(employeeDTO.getLastName());
            existingEmployee.setGender(employeeDTO.getGender());
            existingEmployee.setDob(employeeDTO.getDob());
            existingEmployee.setJoiningDate(employeeDTO.getJoiningDate());
            existingEmployee.setDesignationId(employeeDTO.getDesignationId());
            existingEmployee.setDepartmentId(employeeDTO.getDepartmentId());
            existingEmployee.setRoleId(employeeDTO.getRoleId());
            existingEmployee.setQualification(employeeDTO.getQualification());
            existingEmployee.setEmailId(employeeDTO.getEmailId());      
            existingEmployee.setMobileNo(employeeDTO.getMobileNo());
            existingEmployee.setAddress(employeeDTO.getAddress());
            existingEmployee.setCityId(employeeDTO.getCityId());
            existingEmployee.setStateId(employeeDTO.getStateId());
            existingEmployee.setPincode(employeeDTO.getPincode());
            existingEmployee.setCountry(employeeDTO.getCountry());
            existingEmployee.setRemark(employeeDTO.getRemark());
            existingEmployee.setUpdatedBy(employeeDTO.getUpdatedBy());
            existingEmployee.setActive(employeeDTO.getActive());
            existingEmployee.setUpdatedAt(LocalDateTime.now());
        Employee updatedEmployee = employeeRepository.save(existingEmployee);
        return updatedEmployee.toDTO();
    }

    @Override
    public void deleteEmployee(Long id) throws HMSException {
        if (!employeeRepository.existsById(id)) {
            throw new HMSException("DOCTOR_NOT_FOUND");
        }
        employeeRepository.deleteById(id);
    }

    @Override
    public Page<Employee> findAll(String search, Pageable pageable) {
        if (search == null || search.isBlank()) {
            return employeeRepository.findAll(pageable);
        }
        return employeeRepository.findByFirstNameContainingIgnoreCase(search, pageable);
    }

   
}
