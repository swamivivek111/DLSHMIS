package com.hms.master.api;

import com.hms.master.entity.Doctor;
import com.hms.master.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/master/doctor")
public class DoctorAPI {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllDoctors(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "") String search) {
        
        Pageable pageable = PageRequest.of(page, limit);
        Page<Doctor> doctors = doctorService.findAll(search, pageable);
        
        Map<String, Object> response = new HashMap<>();
        response.put("data", doctors.getContent());
        response.put("totalPages", doctors.getTotalPages());
        response.put("totalItems", doctors.getTotalElements());
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> addDoctor(@RequestBody Doctor doctor) {
        Doctor saved = doctorService.save(doctor);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Doctor created successfully");
        response.put("doctorId", saved.getDoctorId());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.findById(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Map<String, Object>> updateDoctor(@PathVariable Long id, @RequestBody Doctor doctor) {
        doctor.setDoctorId(id);
        Doctor updated = doctorService.save(doctor);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Doctor updated successfully");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteById(id);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Doctor deleted successfully");
        return ResponseEntity.ok(response);
    }
}