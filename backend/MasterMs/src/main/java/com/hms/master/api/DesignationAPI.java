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

import com.hms.master.dto.DesignationDTO;
import com.hms.master.entity.Designation;
import com.hms.master.exception.HMSException;
import com.hms.master.service.DesignationService;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/master/designation")
public class DesignationAPI {
    @Autowired 
    private DesignationService designationService;

    @PostMapping("/add")    
    public ResponseEntity<Map<String, Object>> createDesignation(@RequestBody DesignationDTO designationDTO) throws HMSException {
        Long id = designationService.createDesignation(designationDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Designation created successfully!");
        response.put("designationId", id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{designationId}")
    public ResponseEntity<Map<String, Object>> updateDesignation(@PathVariable Long designationId, @RequestBody DesignationDTO dto) throws HMSException {
        DesignationDTO updated = designationService.updateDesignation(designationId, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Designation updated successfully!");
        response.put("data", updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{designationId}")
    public ResponseEntity<Map<String, Object>> deleteDesignation(@PathVariable Long designationId) throws HMSException {
        designationService.deleteDesignation(designationId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Designation deleted successfully!");
        response.put("designationId", designationId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get/{designationId}")
    public ResponseEntity<DesignationDTO> getByDesignationId(@PathVariable Long designationId) throws HMSException {
        return new ResponseEntity<>(designationService.getByDesignationId(designationId), HttpStatus.OK);
    }

    @GetMapping("/getall/{designationId}")//call 
    public ResponseEntity<List<DesignationDTO>> getAllDesignations(@PathVariable Long designationId) {
        return ResponseEntity.ok(designationService.getAllDesignation(designationId));
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllDesignations(@RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "") String search) {
        
        Pageable pageable = PageRequest.of(page, limit);
        Page<Designation> designations = designationService.findAll(search, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("designations", designations.getContent());
        response.put("totalPages", designations.getTotalPages());
        response.put("totalItems", designations.getTotalElements());

        return ResponseEntity.ok(response);
    }

}
