package com.hms.master.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.master.entity.State;

@Repository
public interface StateRepository extends CrudRepository<State, Long>{

List<State> findByStateId(Long stateId);
Page<State> findByStateNameContainingIgnoreCase(String name, Pageable pageable);
Page<State> findAll(Pageable pageable);
    
}

