package com.hms.profile.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.profile.entity.Doctor;
import java.util.List;


@Repository
public interface DoctorRepository extends CrudRepository<Doctor, Long>{//Use JPA for pagination
    Optional<Doctor> findByEmail(String email);
    Optional<Doctor> findByLicenseNo(String licenseNo);
}
