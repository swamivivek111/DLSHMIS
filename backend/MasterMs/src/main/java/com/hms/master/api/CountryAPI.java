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

import com.hms.master.dto.CountryDTO;
import com.hms.master.entity.Country;
import com.hms.master.exception.HMSException;
import com.hms.master.service.CountryService;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/master/country")
public class CountryAPI {
    @Autowired 
    private CountryService countryService;

    @PostMapping("/add")    
    public ResponseEntity<Map<String, Object>> createCountry(@RequestBody CountryDTO countryDTO) throws HMSException {
        Long id = countryService.createCountry(countryDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Country created successfully!");
        response.put("countryId", id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{countryId}")
    public ResponseEntity<Map<String, Object>> updateCountry(@PathVariable Long countryId, @RequestBody CountryDTO dto) throws HMSException {
        CountryDTO updated = countryService.updateCountry(countryId, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Country updated successfully!");
        response.put("data", updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{countryId}")
    public ResponseEntity<Map<String, Object>> deleteCountry(@PathVariable Long countryId) throws HMSException {
        countryService.deleteCountry(countryId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Country deleted successfully!");
        response.put("countryId", countryId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get/{countryId}")
    public ResponseEntity<CountryDTO> getCountryById(@PathVariable Long countryId) throws HMSException {
        return new ResponseEntity<>(countryService.getByCountryId(countryId), HttpStatus.OK);
    }

    @GetMapping("/getall/{id}")//call 
    public ResponseEntity<List<CountryDTO>> getAllCountrys(@PathVariable Long hospitalId) {
        return ResponseEntity.ok(countryService.getAllCountry(hospitalId));
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllCountrys(@RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "") String search) {
        
        Pageable pageable = PageRequest.of(page, limit);
        Page<Country> countrys = countryService.findAll(search, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("countrys", countrys.getContent());
        response.put("totalPages", countrys.getTotalPages());
        response.put("totalItems", countrys.getTotalElements());

        return ResponseEntity.ok(response);
    }

}
