package com.hms.master.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.master.entity.Designation;

@Repository
public interface DesignationRepository extends CrudRepository<Designation, Long>{

List<Designation> findByDesignationId(Long bloodGroupId);
Page<Designation> findByDesignationNameContainingIgnoreCase(String name, Pageable pageable);
Page<Designation> findAll(Pageable pageable);
    
}

