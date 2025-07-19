package com.hms.master.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.master.entity.Country;

@Repository
public interface CountryRepository extends CrudRepository<Country, Long>{

List<Country> findBycountryId(Long countryId);
Page<Country> findByCountryNameContainingIgnoreCase(String name, Pageable pageable);
Page<Country> findAll(Pageable pageable);
    
}

