package com.hms.master.api;

import com.hms.master.dto.HospitalDTO;
import com.hms.master.entity.Hospital;
import com.hms.master.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/master/hospital")
public class HospitalAPI {

    @Autowired
    private HospitalService hospitalService;

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> createHospital(@RequestBody HospitalDTO hospitalDTO) {
        try {
            Long id = hospitalService.createHospital(hospitalDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Hospital created successfully!");
            response.put("hospitalId", id);
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{hospitalId}")
    public ResponseEntity<Map<String, Object>> updateHospital(@PathVariable Long hospitalId, @RequestBody HospitalDTO hospitalDTO) {
        try {
            HospitalDTO updated = hospitalService.updateHospital(hospitalId, hospitalDTO);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Hospital updated successfully!");
            response.put("data", updated);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{hospitalId}")
    public ResponseEntity<Map<String, Object>> deleteHospital(@PathVariable Long hospitalId) {
        try {
            hospitalService.deleteHospital(hospitalId);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Hospital deleted successfully!");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get/{hospitalId}")
    public ResponseEntity<HospitalDTO> getHospitalById(@PathVariable Long hospitalId) {
        try {
            HospitalDTO hospital = hospitalService.getById(hospitalId);
            return new ResponseEntity<>(hospital, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllHospitals(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "") String search) {
        
        Pageable pageable = PageRequest.of(page, limit);
        Page<Hospital> hospitals = hospitalService.findAll(search, pageable);
        
        Map<String, Object> response = new HashMap<>();
        response.put("hospital", hospitals.getContent());
        response.put("totalPages", hospitals.getTotalPages());
        response.put("totalItems", hospitals.getTotalElements());
        
        return ResponseEntity.ok(response);
    }
}