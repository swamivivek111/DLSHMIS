package com.hms.master.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.master.entity.Taluka;

@Repository
public interface TalukaRepository extends CrudRepository<Taluka, Long>{

List<Taluka> findByTalukaId(Long talukaId);
Page<Taluka> findByTalukaNameContainingIgnoreCase(String name, Pageable pageable);
Page<Taluka> findAll(Pageable pageable);
    
}

