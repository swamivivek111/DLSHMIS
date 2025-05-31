package com.hms.profile.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.profile.entity.Admin;


@Repository
public interface AdminRepository extends CrudRepository<Admin, Long>{//Use JPA for pagination
    Optional<Admin> findByEmail(String email);
    Optional<Admin> findByAadharNo(String aadhar);
}
