package com.hms.master.repository;

import com.hms.master.entity.Bed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BedRepository extends JpaRepository<Bed, Long> {
    
    @Query("SELECT b FROM Bed b WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(b.bedNumber) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(b.bedType) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(b.bedStatus) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<Bed> findAllWithSearch(@Param("search") String search, Pageable pageable);
}