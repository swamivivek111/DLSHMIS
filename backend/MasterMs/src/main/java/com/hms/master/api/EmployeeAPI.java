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

import com.hms.master.dto.EmployeeDTO;
import com.hms.master.entity.Employee;
import com.hms.master.exception.HMSException;
import com.hms.master.service.EmployeeService;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/master/employee")
public class EmployeeAPI {
    @Autowired 
    private EmployeeService employeeService;

    @PostMapping("/add")    
    public ResponseEntity<Map<String, Object>> createEmployee(@RequestBody EmployeeDTO employeeDTO) throws HMSException {
        Long id = employeeService.createEmployee(employeeDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Employee created successfully!");
        response.put("employeeId", id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{employeeId}")
    public ResponseEntity<Map<String, Object>> updateEmployee(@PathVariable Long employeeId, @RequestBody EmployeeDTO dto) throws HMSException {
        EmployeeDTO updated = employeeService.updateEmployee(employeeId, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Employee updated successfully!");
        response.put("data", updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{employeeId}")
    public ResponseEntity<Map<String, Object>> deleteEmployee(@PathVariable Long employeeId) throws HMSException {
        employeeService.deleteEmployee(employeeId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Employee deleted successfully!");
        response.put("employeeId", employeeId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get/{employeeId}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable Long employeeId) throws HMSException {
        return new ResponseEntity<>(employeeService.getById(employeeId), HttpStatus.OK);
    }

    @GetMapping("/getall/{employeeId}")//call 
    public ResponseEntity<List<EmployeeDTO>> getAllEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(employeeService.getAllEmployee(employeeId));
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllEmployee(@RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "") String search) {
        
        Pageable pageable = PageRequest.of(page, limit);
        Page<Employee> employee = employeeService.findAll(search, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("employee", employee.getContent());
        response.put("totalPages", employee.getTotalPages());
        response.put("totalItems", employee.getTotalElements());

        return ResponseEntity.ok(response);
    }

}
