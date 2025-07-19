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

import com.hms.master.dto.BloodGroupDTO;
import com.hms.master.entity.BloodGroup;
import com.hms.master.exception.HMSException;
import com.hms.master.service.BloodGroupService;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/master/bloodGroup")
public class BloodGroupAPI {
    @Autowired 
    private BloodGroupService bloodGroupService;

    @PostMapping("/add")    
    public ResponseEntity<Map<String, Object>> createBloodGroup(@RequestBody BloodGroupDTO bloodGroupDTO) throws HMSException {
        Long id = bloodGroupService.createBloodGroup(bloodGroupDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "BloodGroup created successfully!");
        response.put("bloodGroupId", id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{bloodGroupId}")
    public ResponseEntity<Map<String, Object>> updateBloodGroup(@PathVariable Long bloodGroupId, @RequestBody BloodGroupDTO dto) throws HMSException {
        BloodGroupDTO updated = bloodGroupService.updateBloodGroup(bloodGroupId, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "BloodGroup updated successfully!");
        response.put("data", updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{bloodGroupId}")
    public ResponseEntity<Map<String, Object>> deleteBloodGroup(@PathVariable Long bloodGroupId) throws HMSException {
        bloodGroupService.deleteBloodGroup(bloodGroupId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "BloodGroup deleted successfully!");
        response.put("bloodGroupId", bloodGroupId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get/{bloodGroupId}")
    public ResponseEntity<BloodGroupDTO> getByBloodGroupId(@PathVariable Long bloodGroupId) throws HMSException {
        return new ResponseEntity<>(bloodGroupService.getByBloodGroupId(bloodGroupId), HttpStatus.OK);
    }

    @GetMapping("/getall/{bloodGroupId}")//call 
    public ResponseEntity<List<BloodGroupDTO>> getAllBloodGroups(@PathVariable Long bloodGroupId) {
        return ResponseEntity.ok(bloodGroupService.getAllBloodGroup(bloodGroupId));
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllBloodGroups(@RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "") String search) {
        
        Pageable pageable = PageRequest.of(page, limit);
        Page<BloodGroup> bloodGroups = bloodGroupService.findAll(search, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("bloodGroups", bloodGroups.getContent());
        response.put("totalPages", bloodGroups.getTotalPages());
        response.put("totalItems", bloodGroups.getTotalElements());

        return ResponseEntity.ok(response);
    }

}
