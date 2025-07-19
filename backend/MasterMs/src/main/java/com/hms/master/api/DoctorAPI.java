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

import com.hms.master.dto.DoctorDTO;
import com.hms.master.entity.Doctor;
import com.hms.master.exception.HMSException;
import com.hms.master.service.DoctorService;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/master/doctor")
public class DoctorAPI {
    @Autowired 
    private DoctorService doctorService;

    @PostMapping("/add")    
    public ResponseEntity<Map<String, Object>> createDoctor(@RequestBody DoctorDTO doctorDTO) throws HMSException {
        Long id = doctorService.createDoctor(doctorDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Doctor created successfully!");
        response.put("doctorId", id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{doctorId}")
    public ResponseEntity<Map<String, Object>> updateDoctor(@PathVariable Long doctorId, @RequestBody DoctorDTO dto) throws HMSException {
        DoctorDTO updated = doctorService.updateDoctor(doctorId, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Doctor updated successfully!");
        response.put("data", updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{doctorId}")
    public ResponseEntity<Map<String, Object>> deleteDoctor(@PathVariable Long doctorId) throws HMSException {
        doctorService.deleteDoctor(doctorId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Doctor deleted successfully!");
        response.put("doctorId", doctorId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get/{doctorId}")
    public ResponseEntity<DoctorDTO> getDoctorById(@PathVariable Long doctorId) throws HMSException {
        return new ResponseEntity<>(doctorService.getById(doctorId), HttpStatus.OK);
    }

    @GetMapping("/getall/{doctorId}")//call 
    public ResponseEntity<List<DoctorDTO>> getAllDoctors(@PathVariable Long doctorId) {
        return ResponseEntity.ok(doctorService.getAllDoctor(doctorId));
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllDoctors(@RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "") String search) {
        
        Pageable pageable = PageRequest.of(page, limit);
        Page<Doctor> doctors = doctorService.findAll(search, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("doctors", doctors.getContent());
        response.put("totalPages", doctors.getTotalPages());
        response.put("totalItems", doctors.getTotalElements());

        return ResponseEntity.ok(response);
    }

}
