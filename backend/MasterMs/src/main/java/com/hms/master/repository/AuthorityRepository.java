package com.hms.master.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.hms.master.entity.Authority;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Long> {
    
    List<Authority> findByIsActiveTrue();
    
    @Query("SELECT a FROM Authority a WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(a.authorityName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(a.authorityCode) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Authority> findAllWithSearch(@Param("search") String search, Pageable pageable);
    
    boolean existsByAuthorityCode(String authorityCode);
    boolean existsByAuthorityName(String authorityName);
    boolean existsByAuthorityCodeAndAuthorityIdNot(String authorityCode, Long authorityId);
    boolean existsByAuthorityNameAndAuthorityIdNot(String authorityName, Long authorityId);
}