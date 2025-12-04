package com.hms.master.repository;

import com.hms.master.entity.Ward;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WardRepository extends JpaRepository<Ward, Long> {
    
    @Query("SELECT w FROM Ward w WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(w.wardName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(w.wardType) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(w.blockBuildingName) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Ward> findAllWithSearch(@Param("search") String search, Pageable pageable);
}