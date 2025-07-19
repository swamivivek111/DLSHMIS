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

import com.hms.master.dto.TalukaDTO;
import com.hms.master.entity.Taluka;
import com.hms.master.exception.HMSException;
import com.hms.master.service.TalukaService;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/master/taluka")
public class TalukaAPI {
    @Autowired 
    private TalukaService talukaService;

    @PostMapping("/add")    
    public ResponseEntity<Map<String, Object>> createTaluka(@RequestBody TalukaDTO talukaDTO) throws HMSException {
        Long id = talukaService.createTaluka(talukaDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Taluka created successfully!");
        response.put("talukaId", id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{talukaId}")
    public ResponseEntity<Map<String, Object>> updateTaluka(@PathVariable Long talukaId, @RequestBody TalukaDTO dto) throws HMSException {
        TalukaDTO updated = talukaService.updateTaluka(talukaId, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Taluka updated successfully!");
        response.put("data", updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{talukaId}")
    public ResponseEntity<Map<String, Object>> deleteTaluka(@PathVariable Long talukaId) throws HMSException {
        talukaService.deleteTaluka(talukaId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Taluka deleted successfully!");
        response.put("talukaId", talukaId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get/{talukaId}")
    public ResponseEntity<TalukaDTO> getByTalukaId(@PathVariable Long talukaId) throws HMSException {
        return new ResponseEntity<>(talukaService.getByTalukaId(talukaId), HttpStatus.OK);
    }

    @GetMapping("/getall/{talukaId}")//call 
    public ResponseEntity<List<TalukaDTO>> getAllTalukas(@PathVariable Long talukaId) {
        return ResponseEntity.ok(talukaService.getAllTaluka(talukaId));
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllTalukas(@RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "") String search) {
        
        Pageable pageable = PageRequest.of(page, limit);
        Page<Taluka> talukas = talukaService.findAll(search, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("talukas", talukas.getContent());
        response.put("totalPages", talukas.getTotalPages());
        response.put("totalItems", talukas.getTotalElements());

        return ResponseEntity.ok(response);
    }

}
