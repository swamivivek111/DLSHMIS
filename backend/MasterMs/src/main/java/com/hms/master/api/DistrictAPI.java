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

import com.hms.master.dto.DistrictDTO;
import com.hms.master.entity.District;
import com.hms.master.exception.HMSException;
import com.hms.master.service.DistrictService;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/master/district")
public class DistrictAPI {
    @Autowired 
    private DistrictService districtService;

    @PostMapping("/add")    
    public ResponseEntity<Map<String, Object>> createDistrict(@RequestBody DistrictDTO districtDTO) throws HMSException {
        Long id = districtService.createDistrict(districtDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "District created successfully!");
        response.put("districtId", id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{districtId}")
    public ResponseEntity<Map<String, Object>> updateDistrict(@PathVariable Long districtId, @RequestBody DistrictDTO dto) throws HMSException {
        DistrictDTO updated = districtService.updateDistrict(districtId, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "District updated successfully!");
        response.put("data", updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{districtId}")
    public ResponseEntity<Map<String, Object>> deleteDistrict(@PathVariable Long districtId) throws HMSException {
        districtService.deleteDistrict(districtId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "District deleted successfully!");
        response.put("districtId", districtId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get/{districtId}")
    public ResponseEntity<DistrictDTO> getByDistrictId(@PathVariable Long districtId) throws HMSException {
        return new ResponseEntity<>(districtService.getByDistrictId(districtId), HttpStatus.OK);
    }

    @GetMapping("/getall/{districtId}")//call 
    public ResponseEntity<List<DistrictDTO>> getAllDistricts(@PathVariable Long districtId) {
        return ResponseEntity.ok(districtService.getAllDistrict(districtId));
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllDistricts(@RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "") String search) {
        
        Pageable pageable = PageRequest.of(page, limit);
        Page<District> districts = districtService.findAll(search, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("districts", districts.getContent());
        response.put("totalPages", districts.getTotalPages());
        response.put("totalItems", districts.getTotalElements());

        return ResponseEntity.ok(response);
    }

}
