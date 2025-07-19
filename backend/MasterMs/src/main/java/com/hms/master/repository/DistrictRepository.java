package com.hms.master.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.master.entity.District;

@Repository
public interface DistrictRepository extends CrudRepository<District, Long>{

List<District> findByDistrictId(Long districtId);
Page<District> findByDistrictNameContainingIgnoreCase(String name, Pageable pageable);
Page<District> findAll(Pageable pageable);
    
}

