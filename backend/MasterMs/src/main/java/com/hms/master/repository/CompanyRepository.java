package com.hms.master.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.hms.master.entity.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    
    Optional<Company> findByCompanyCode(String companyCode);
    
    Optional<Company> findByCompanyName(String companyName);
    
    List<Company> findByIsActiveTrue();
    
    @Query("SELECT c FROM Company c WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(c.companyName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.companyCode) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.email) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Company> findAllWithSearch(@Param("search") String search, Pageable pageable);
    
    boolean existsByCompanyCode(String companyCode);
    
    boolean existsByCompanyName(String companyName);
    
    boolean existsByCompanyCodeAndCompanyIdNot(String companyCode, Long companyId);
    
    boolean existsByCompanyNameAndCompanyIdNot(String companyName, Long companyId);
}