package com.hms.master.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.master.entity.UserMenu;

@Repository
public interface UserMenuRepository extends CrudRepository<UserMenu, Long>{

List<UserMenu> findByid(Long id);
Page<UserMenu> findByEmployeeCodeContainingIgnoreCase(String name, Pageable pageable);
Page<UserMenu> findAll(Pageable pageable);
    
}

