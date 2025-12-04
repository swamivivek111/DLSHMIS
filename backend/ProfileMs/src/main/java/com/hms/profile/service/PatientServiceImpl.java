package com.hms.profile.service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.profile.dto.PatientDTO;
import com.hms.profile.entity.Doctor;
import com.hms.profile.entity.Patient;
import com.hms.profile.exception.HMSException;
import com.hms.profile.repository.PatientRepository;
@Service
public class PatientServiceImpl implements PatientService{

    @Autowired
    PatientRepository patientRepository;

    @Override
    public Long addPatient(PatientDTO patientDTO) throws HMSException {
        if(patientDTO.getPrnNo()!=null && patientRepository.findByPrnNo(patientDTO.getPrnNo()).isPresent())throw new HMSException("PATIENT_ALREADY_EXISTS");
        if(patientDTO.getAadharNumber()!=null && patientRepository.findByAadharNumber(patientDTO.getAadharNumber()).isPresent())throw new HMSException("PATIENT_ALREADY_EXISTS");
        if(patientDTO.getEmail()!=null && patientRepository.findByEmail(patientDTO.getEmail()).isPresent())throw new HMSException("PATIENT_ALREADY_EXISTS");

        return patientRepository.save(patientDTO.toEntity()).getId();
    }

    @Override
    public PatientDTO getPatientById(Long id) throws HMSException {
        return patientRepository.findById(id).orElseThrow(()->new HMSException("PATIENT_NOT_FOUND")).toDTO();
    }

    @Override
    public PatientDTO updatePatient(PatientDTO patientDTO) throws HMSException {
        patientRepository.findById(patientDTO.getId()).orElseThrow(()->new HMSException("PATIENT_NOT_FOUND"));
        return patientRepository.save(patientDTO.toEntity()).toDTO();
    }
    
    @Override
	public boolean exitPatientById(Long id) throws HMSException {
		return patientRepository.existsById(id);
	}

    @Override
    public List<Patient> getAllPatients() {
        Iterable<Patient> iterablePatients = patientRepository.findAll();
        return StreamSupport.stream(iterablePatients.spliterator(), false)
        .collect(Collectors.toList());
    }

    @Override
    public void deletePatient(Long id) throws HMSException {
        patientRepository.findById(id).orElseThrow(() -> new HMSException("PATIENT_NOT_FOUND"));
        patientRepository.deleteById(id);
    }
}
