package com.hms.master.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.master.entity.BloodGroup;

@Repository
public interface BloodGroupRepository extends CrudRepository<BloodGroup, Long>{

List<BloodGroup> findByBloodGroupId(Long bloodGroupId);
Page<BloodGroup> findByBloodGroupContainingIgnoreCase(String name, Pageable pageable);
Page<BloodGroup> findAll(Pageable pageable);
    
}

