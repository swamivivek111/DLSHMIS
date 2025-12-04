package com.hms.master.repository;

import com.hms.master.entity.CategoryTariffMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface CategoryTariffMappingRepository extends JpaRepository<CategoryTariffMapping, Long> {
    
    List<CategoryTariffMapping> findByIsActiveTrue();
    
    List<CategoryTariffMapping> findByCategoryIdAndIsActiveTrue(Long categoryId);
    
    List<CategoryTariffMapping> findByTariffIdAndIsActiveTrue(Long tariffId);
    
    @Query("SELECT c FROM CategoryTariffMapping c WHERE c.isActive = true AND " +
           "c.effectiveFrom <= :date AND (c.effectiveTo IS NULL OR c.effectiveTo >= :date)")
    List<CategoryTariffMapping> findActiveOnDate(@Param("date") LocalDate date);
}