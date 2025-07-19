package com.hms.master.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.master.entity.Title;

@Repository
public interface TitleRepository extends CrudRepository<Title, Long>{

List<Title> findByTitleId(Long titleId);
Page<Title> findByTitleNameContainingIgnoreCase(String name, Pageable pageable);
Page<Title> findAll(Pageable pageable);
    
}

