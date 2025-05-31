package com.hms.profile.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.profile.entity.Patient;


@Repository
public interface PatientRepository extends CrudRepository<Patient, Long>{//Use JPA for pagination
    Optional<Patient> findByEmail(String email);
    Optional<Patient> findByAadharNo(String aadhar);
}
