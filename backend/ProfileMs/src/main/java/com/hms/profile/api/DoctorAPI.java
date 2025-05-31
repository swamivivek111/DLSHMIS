package com.hms.profile.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.profile.dto.DoctorDTO;
import com.hms.profile.dto.DoctorDTO;
import com.hms.profile.exception.HMSException;
import com.hms.profile.service.DoctorService;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/profile/doctor")
public class DoctorAPI {
    @Autowired
    private DoctorService doctorService;

    @PostMapping("/add")
    public ResponseEntity<Long> addDoctor(@RequestBody DoctorDTO doctorDTO) throws HMSException {
        return new ResponseEntity<>(doctorService.addDoctor(doctorDTO), HttpStatus.CREATED);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<DoctorDTO> getDoctor(@PathVariable Long id) throws HMSException {
        return new ResponseEntity(doctorService.getDoctorById(id), HttpStatus.OK);
    }
    
    @GetMapping("/getall")
    public ResponseEntity<List<DoctorDTO>> getAllDoctors() throws HMSException {
        return new ResponseEntity(doctorService.getAllDoctors(), HttpStatus.OK);
    }
    
    @PutMapping("/update")
    public ResponseEntity<DoctorDTO> updateDoctor(@RequestBody DoctorDTO doctorDTO) throws HMSException {
        return new ResponseEntity(doctorService.updateDoctor(doctorDTO), HttpStatus.OK);
    }

    @GetMapping("/exists/{id}")
    public ResponseEntity<Boolean> isExists(@PathVariable Long id) throws HMSException {
        return ResponseEntity.ok(doctorService.exitDoctorById(id));
    }
}