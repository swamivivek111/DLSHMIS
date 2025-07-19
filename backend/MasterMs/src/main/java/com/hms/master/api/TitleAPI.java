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

import com.hms.master.dto.TitleDTO;
import com.hms.master.entity.Title;
import com.hms.master.exception.HMSException;
import com.hms.master.service.TitleService;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/master/title")
public class TitleAPI {
    @Autowired 
    private TitleService titleService;

    @PostMapping("/add")    
    public ResponseEntity<Map<String, Object>> createTitle(@RequestBody TitleDTO titleDTO) throws HMSException {
        Long id = titleService.createTitle(titleDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Title created successfully!");
        response.put("titleId", id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{titleId}")
    public ResponseEntity<Map<String, Object>> updateTitle(@PathVariable Long titleId, @RequestBody TitleDTO dto) throws HMSException {
        TitleDTO updated = titleService.updateTitle(titleId, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Title updated successfully!");
        response.put("data", updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{titleId}")
    public ResponseEntity<Map<String, Object>> deleteTitle(@PathVariable Long titleId) throws HMSException {
        titleService.deleteTitle(titleId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Title deleted successfully!");
        response.put("titleId", titleId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get/{titleId}")
    public ResponseEntity<TitleDTO> getByTitleId(@PathVariable Long titleId) throws HMSException {
        return new ResponseEntity<>(titleService.getByTitleId(titleId), HttpStatus.OK);
    }

    @GetMapping("/getall/{titleId}")//call 
    public ResponseEntity<List<TitleDTO>> getAllTitles(@PathVariable Long titleId) {
        return ResponseEntity.ok(titleService.getAllTitle(titleId));
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllTitles(@RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "") String search) {
        
        Pageable pageable = PageRequest.of(page, limit);
        Page<Title> titles = titleService.findAll(search, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("titles", titles.getContent());
        response.put("totalPages", titles.getTotalPages());
        response.put("totalItems", titles.getTotalElements());

        return ResponseEntity.ok(response);
    }

}
