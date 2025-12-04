package com.hms.user.repository;

import com.hms.user.entity.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    
    Optional<Role> findByRoleName(String roleName);
    
    List<Role> findByActiveTrue();
    
    List<Role> findByCategory(String category);
    
    @Query("SELECT r FROM Role r WHERE r.active = true AND " +
           "(LOWER(r.roleName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(r.category) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Role> findBySearchTerm(@Param("search") String search, Pageable pageable);
    
    boolean existsByRoleName(String roleName);
}