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

import com.hms.master.dto.CityDTO;
import com.hms.master.entity.City;
import com.hms.master.exception.HMSException;
import com.hms.master.service.CityService;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/master/city")
public class CityAPI {
    @Autowired 
    private CityService cityService;

    @PostMapping("/add")    
    public ResponseEntity<Map<String, Object>> createCity(@RequestBody CityDTO cityDTO) throws HMSException {
        Long id = cityService.createCity(cityDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "City created successfully!");
        response.put("cityId", id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{cityId}")
    public ResponseEntity<Map<String, Object>> updateCity(@PathVariable Long cityId, @RequestBody CityDTO dto) throws HMSException {
        CityDTO updated = cityService.updateCity(cityId, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "City updated successfully!");
        response.put("data", updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{cityId}")
    public ResponseEntity<Map<String, Object>> deleteCity(@PathVariable Long cityId) throws HMSException {
        cityService.deleteCity(cityId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "City deleted successfully!");
        response.put("cityId", cityId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get/{cityId}")
    public ResponseEntity<CityDTO> getByCityId(@PathVariable Long cityId) throws HMSException {
        return new ResponseEntity<>(cityService.getByCityId(cityId), HttpStatus.OK);
    }

    @GetMapping("/getall/{cityId}")//call 
    public ResponseEntity<List<CityDTO>> getAllCitys(@PathVariable Long cityId) {
        return ResponseEntity.ok(cityService.getAllCity(cityId));
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllCitys(@RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "") String search) {
        
        Pageable pageable = PageRequest.of(page, limit);
        Page<City> citys = cityService.findAll(search, pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("citys", citys.getContent());
        response.put("totalPages", citys.getTotalPages());
        response.put("totalItems", citys.getTotalElements());

        return ResponseEntity.ok(response);
    }

}
