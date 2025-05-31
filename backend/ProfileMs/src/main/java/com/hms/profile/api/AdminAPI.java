package com.hms.profile.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.profile.dto.AdminDTO;
import com.hms.profile.dto.DoctorDTO;
import com.hms.profile.dto.PatientDTO;
import com.hms.profile.exception.HMSException;
import com.hms.profile.service.AdminService;
import com.hms.profile.service.PatientService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@CrossOrigin
@Validated
@RequestMapping("/profile/admin")
public class AdminAPI {
    @Autowired 
    private AdminService adminService;

    @PostMapping("/add")
    public ResponseEntity<Long> addAdmin(@RequestBody AdminDTO adminDTO) throws HMSException {
        return new ResponseEntity<>(adminService.addAdmin(adminDTO), HttpStatus.CREATED);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<AdminDTO> getPatient(@PathVariable Long id) throws HMSException {
        return new ResponseEntity(adminService.getAdminById(id), HttpStatus.OK);
    }
    
    @PutMapping("/update")
    public ResponseEntity<AdminDTO> updatePatient(@RequestBody AdminDTO adminDTO) throws HMSException {
        return new ResponseEntity(adminService.updateAdmin(adminDTO), HttpStatus.OK);
    }
    
    @GetMapping("/exists/{id}")
    public ResponseEntity<Boolean> isExists(@PathVariable Long id) throws HMSException {
        return ResponseEntity.ok(adminService.exitAdminById(id));
    }

    
}
