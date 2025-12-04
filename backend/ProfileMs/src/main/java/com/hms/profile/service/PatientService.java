package com.hms.profile.service;

import java.util.List;

import com.hms.profile.dto.PatientDTO;
import com.hms.profile.entity.Patient;
import com.hms.profile.exception.HMSException;

public interface PatientService {
    public Long addPatient(PatientDTO patientDTO)throws HMSException;
    public PatientDTO getPatientById(Long id)throws HMSException;
    public PatientDTO updatePatient(PatientDTO patientDTO)throws HMSException;
    public boolean exitPatientById(Long id) throws HMSException;
    public List<Patient> getAllPatients();
    public void deletePatient(Long id) throws HMSException;
}
