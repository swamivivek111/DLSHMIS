package com.hms.master.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.hms.master.entity.PatientCategory;

@Repository
public interface PatientCategoryRepository extends JpaRepository<PatientCategory, Long> {
    
    List<PatientCategory> findByIsActiveTrue();
    
    @Query("SELECT pc FROM PatientCategory pc WHERE " +
           "(:search IS NULL OR :search = '' OR " +
           "LOWER(pc.categoryName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(pc.categoryCode) LIKE LOWER(CONCAT('%', :search, '%')))")
    Page<PatientCategory> findAllWithSearch(@Param("search") String search, Pageable pageable);
    
    boolean existsByCategoryCode(String categoryCode);
    boolean existsByCategoryName(String categoryName);
    boolean existsByCategoryCodeAndCategoryIdNot(String categoryCode, Long categoryId);
    boolean existsByCategoryNameAndCategoryIdNot(String categoryName, Long categoryId);
}