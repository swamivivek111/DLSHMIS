package com.hms.master.repository;

import com.hms.master.entity.Hospital;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {
    
    @Query("SELECT h FROM Hospital h WHERE " +
           "(:search = '' OR LOWER(h.hospitalName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(h.hospitalCode) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(h.city) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Hospital> findBySearchTerm(@Param("search") String search, Pageable pageable);
    
    boolean existsByHospitalCode(String hospitalCode);
    boolean existsByHospitalCodeAndHospitalIdNot(String hospitalCode, Long hospitalId);
}