package com.hms.profile.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hms.profile.entity.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Optional<Doctor> findByEmailId(String emailId);
    Page<Doctor> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
