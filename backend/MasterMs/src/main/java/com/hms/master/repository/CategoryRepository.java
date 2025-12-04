package com.hms.master.repository;

import com.hms.master.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    List<Category> findByIsActiveTrue();
    
    Optional<Category> findByCategoryNameAndIsActiveTrue(String categoryName);
    
    Optional<Category> findByCategoryCodeAndIsActiveTrue(String categoryCode);
    
    List<Category> findByCategoryTypeAndIsActiveTrue(String categoryType);
    
    @Query("SELECT c FROM Category c WHERE " +
           "(LOWER(c.categoryName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.categoryCode) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
           "c.isActive = true")
    List<Category> searchCategories(@Param("search") String search);
    
    boolean existsByCategoryNameAndIsActiveTrue(String categoryName);
    
    boolean existsByCategoryCodeAndIsActiveTrue(String categoryCode);
}