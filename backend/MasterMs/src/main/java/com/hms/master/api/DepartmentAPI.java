package com.hms.master.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.master.dto.DepartmentDTO;
import com.hms.master.entity.Department;
import com.hms.master.exception.HMSException;
import com.hms.master.service.DepartmentService;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/master/department")
public class DepartmentAPI {
    @Autowired 
    private DepartmentService departmentService;

    @PostMapping("/add")    
    public ResponseEntity<Map<String, Object>> createDepartment(@RequestBody DepartmentDTO departmentDTO) throws HMSException {
        Long id = departmentService.createDepartment(departmentDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Department created successfully!");
        response.put("id", id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateDepartment(@PathVariable Long id, @RequestBody DepartmentDTO dto) throws HMSException {
        DepartmentDTO updated = departmentService.updateDepartment(id, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Department updated successfully!");
        response.put("data", updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteDepartment(@PathVariable Long id) throws HMSException {
        departmentService.deleteDepartment(id);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Department deleted successfully!");
        response.put("id", id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<DepartmentDTO> getDepartmentById(@PathVariable Long id) throws HMSException {
        return new ResponseEntity<>(departmentService.getById(id), HttpStatus.OK);
    }

    @GetMapping("/getall/{hospitalId}")//call 
    public ResponseEntity<List<DepartmentDTO>> getAllDepartments(@PathVariable Long hospitalId) {
        return ResponseEntity.ok(departmentService.getAllDepartment(hospitalId));
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllDepartments(@RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "") String search) {
        
        Pageable pageable = PageRequest.of(page, limit);
        Page<Department> departments = departmentService.findAll(search, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("departments", departments.getContent());
        response.put("totalPages", departments.getTotalPages());
        response.put("totalItems", departments.getTotalElements());

        return ResponseEntity.ok(response);
    }

}
