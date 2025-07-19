package com.hms.master.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.master.entity.City;

@Repository
public interface CityRepository extends CrudRepository<City, Long>{

List<City> findByCityId(Long cityId);
Page<City> findByCityNameContainingIgnoreCase(String name, Pageable pageable);
Page<City> findAll(Pageable pageable);
    
}

