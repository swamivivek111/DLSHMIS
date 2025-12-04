package com.hms.user.repository;

import com.hms.user.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
    
    Optional<Permission> findByPermissionName(String permissionName);
    
    List<Permission> findByActiveTrue();
    
    List<Permission> findByModule(String module);
    
    boolean existsByPermissionName(String permissionName);
}