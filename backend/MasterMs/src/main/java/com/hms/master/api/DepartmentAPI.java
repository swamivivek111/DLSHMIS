package com.hms.master.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import com.hms.master.dto.DepartmentDTO;
import com.hms.master.exception.HMSException;
import com.hms.master.service.DepartmentService;


@RestController
@CrossOrigin
@Validated
@RequestMapping("/mater/department")
public class DepartmentAPI {
    @Autowired 
    private DepartmentService departmentService;

    @PostMapping("/add")
    public ResponseEntity<Long> createDepartment(@RequestBody DepartmentDTO departmentDTO) throws HMSException {
        return new ResponseEntity<>(departmentService.createDepartment(departmentDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartmentDTO> updateDepartment(@PathVariable Long id, @RequestBody DepartmentDTO dto) throws HMSException {
        DepartmentDTO updated = departmentService.updateDepartment(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable Long id) throws HMSException {
        departmentService.deleteDepartment(id);
        return ResponseEntity.ok("Department deleted");
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<DepartmentDTO> getDepartmentById(@PathVariable Long id) throws HMSException {
        return new ResponseEntity<>(departmentService.getById(id), HttpStatus.OK);
    }

    @GetMapping("/getall/{hospitalId}")//call 
    public ResponseEntity<List<DepartmentDTO>> getAllDepartments(@PathVariable Long hospitalId) {
        return ResponseEntity.ok(departmentService.getAllDepartment(hospitalId));
    }

    @GetMapping("/getall")//call 
    public ResponseEntity<List<DepartmentDTO>> getAll() {
        return ResponseEntity.ok(departmentService.getAllDepartment(null));
    }

}
