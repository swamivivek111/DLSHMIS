package com.hms.master.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.master.dto.DepartmentDTO;
import com.hms.master.entity.Department;
import com.hms.master.exception.HMSException;
import com.hms.master.repository.DepartmentRepository;

@Service
public class DepartmentServiceImpl implements DepartmentService{
    
    @Autowired
    private DepartmentRepository departmentRepository;
    
    @Autowired 
	private APIService apiService;

    @Override
    public DepartmentDTO getById(Long departmentId) throws HMSException {
        return departmentRepository.findById(departmentId).orElseThrow(() -> new HMSException("DEPARTMENT_NOT_FOUND")).toDTO();
    }

    @Override
    public List<DepartmentDTO> findByHospitalId(Long hospitalId) {
        return departmentRepository.findByHospitalId(hospitalId).stream().map(Department::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<DepartmentDTO> getAllDepartment(Long hospitalId) {
        List<Department> departments = (hospitalId != null)
        ? departmentRepository.findByHospitalId(hospitalId)
        : (List<Department>) departmentRepository.findAll();
        return departments.stream().map(Department::toDTO).collect(Collectors.toList());
    }

    @Override
    public Long createDepartment(DepartmentDTO departmentDTO) {
        Department department = departmentDTO.toEntity();
        department = departmentRepository.save(department);
        return department.toDTO().getId();
    }

    @Override
    public DepartmentDTO updateDepartment(Long id, DepartmentDTO departmentDTO) throws HMSException {
        Department existingDepartment = departmentRepository.findById(id).orElseThrow(() -> new HMSException("DEPARTMENT_NOT_FOUND"));
            existingDepartment.setName(departmentDTO.getName());
            existingDepartment.setDescription(departmentDTO.getDescription());
            existingDepartment.setHeadOfDepartment(departmentDTO.getHeadOfDepartment());
            existingDepartment.setContactNumber(departmentDTO.getContactNumber());
            existingDepartment.setEmail(departmentDTO.getEmail());
            existingDepartment.setHospitalId(departmentDTO.getHospitalId());
            existingDepartment.setActive(departmentDTO.getActive());
        Department updatedDepartment = departmentRepository.save(existingDepartment);
        return updatedDepartment.toDTO();
    }

    @Override
    public void deleteDepartment(Long id) throws HMSException {
        if (!departmentRepository.existsById(id)) {
            throw new HMSException("DEPARTMENT_NOT_FOUND");
        }
        departmentRepository.deleteById(id);
    }

   
}
