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

import com.hms.master.dto.DoctorsScheduleDTO;
import com.hms.master.entity.DoctorsSchedule;
import com.hms.master.exception.HMSException;
import com.hms.master.service.DoctorsScheduleService;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/master/doctorsSchedule")
public class DoctorsScheduleAPI {
    @Autowired 
    private DoctorsScheduleService doctorsScheduleService;

    @PostMapping("/add")    
    public ResponseEntity<Map<String, Object>> createDoctorsSchedule(@RequestBody DoctorsScheduleDTO doctorsScheduleDTO) throws HMSException {
        Long id = doctorsScheduleService.createDoctorsSchedule(doctorsScheduleDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "DoctorsSchedule created successfully!");
        response.put("doctorId", id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{doctorId}")
    public ResponseEntity<Map<String, Object>> updateDoctorsSchedule(@PathVariable Long doctorId, @RequestBody DoctorsScheduleDTO dto) throws HMSException {
        DoctorsScheduleDTO updated = doctorsScheduleService.updateDoctorsSchedule(doctorId, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "DoctorsSchedule updated successfully!");
        response.put("data", updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{doctorId}")
    public ResponseEntity<Map<String, Object>> deleteDoctorsSchedule(@PathVariable Long doctorId) throws HMSException {
        doctorsScheduleService.deleteDoctorsSchedule(doctorId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "DoctorsSchedule deleted successfully!");
        response.put("doctorId", doctorId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*@GetMapping("/get/{doctorId}")
    public ResponseEntity<DoctorsScheduleDTO> getDoctorsScheduleById(@PathVariable Long doctorId) throws HMSException {
        return new ResponseEntity<>(doctorsScheduleService.getById(doctorId), HttpStatus.OK);
    }*/

    @GetMapping("/getall/{doctorId}")//call 
    public ResponseEntity<List<DoctorsScheduleDTO>> getAllDoctorsSchedules(@PathVariable Long doctorId) {
        return ResponseEntity.ok(doctorsScheduleService.getAllDoctorsSchedule());
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllDoctorsSchedules(@RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "") String search) {
        
        Pageable pageable = PageRequest.of(page, limit);
        Page<DoctorsSchedule> doctorsSchedule = doctorsScheduleService.findAll(pageable);
        Map<String, Object> response = new HashMap<>();
        response.put("doctors", doctorsSchedule.getContent());
        response.put("totalPages", doctorsSchedule.getTotalPages());
        response.put("totalItems", doctorsSchedule.getTotalElements());

        return ResponseEntity.ok(response);
    }

}
