package com.hms.profile.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.profile.dto.PatientDTO;
import com.hms.profile.exception.HMSException;
import com.hms.profile.service.PatientService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;




@RestController
@CrossOrigin
@Validated
@RequestMapping("/profile/patient")
public class PatientAPI {
    @Autowired 
    private PatientService patientService;

    @PostMapping("/add")
    public ResponseEntity<Long> addPatient(@RequestBody PatientDTO patientDTO) throws HMSException {
        return new ResponseEntity<>(patientService.addPatient(patientDTO), HttpStatus.CREATED);
    }
    
    @GetMapping("/get/{id}")
    public ResponseEntity<PatientDTO> getPatient(@PathVariable Long id) throws HMSException {
        return new ResponseEntity(patientService.getPatientById(id), HttpStatus.OK);
    }
    
    @PutMapping("/update")
    public ResponseEntity<PatientDTO> updatePatient(@RequestBody PatientDTO patientDTO) throws HMSException {
        return new ResponseEntity(patientService.updatePatient(patientDTO), HttpStatus.OK);
    }

    @GetMapping("/exists/{id}")
    public ResponseEntity<Boolean> isExists(@PathVariable Long id) throws HMSException {
        return ResponseEntity.ok(patientService.exitPatientById(id));
    }
    
    @GetMapping("/getall")
    public ResponseEntity<List<PatientDTO>> getAllDoctors() throws HMSException {
        return new ResponseEntity(patientService.getAllPatients(), HttpStatus.OK);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable Long id) throws HMSException {
        patientService.deletePatient(id);
        return new ResponseEntity<>("Patient deleted successfully", HttpStatus.OK);
    }
}
