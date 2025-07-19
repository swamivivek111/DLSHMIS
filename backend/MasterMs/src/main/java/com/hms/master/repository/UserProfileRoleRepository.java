package com.hms.master.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.master.entity.UserProfileRole;

@Repository
public interface UserProfileRoleRepository extends CrudRepository<UserProfileRole, Long>{

List<UserProfileRole> findByRoleId(Long roleId);
Page<UserProfileRole> findByRoleNameContainingIgnoreCase(String name, Pageable pageable);
Page<UserProfileRole> findAll(Pageable pageable);
    
}

