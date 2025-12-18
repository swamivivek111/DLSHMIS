package com.hms.master.repository;

import com.hms.master.entity.Tariff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TariffRepository extends JpaRepository<Tariff, Long> {
    List<Tariff> findByIsActiveTrue();
    List<Tariff> findByServiceCategoryAndIsActiveTrue(String serviceCategory);
    List<Tariff> findByServiceNameAndIsActiveTrue(String serviceName);
    List<Tariff> findByDepartmentAndIsActiveTrue(String department);
    
    @Query(value = "SELECT MAX(CAST(tariff_code AS UNSIGNED)) FROM tariffs WHERE tariff_code REGEXP '^[0-9]+$'", nativeQuery = true)
    Integer findMaxSequentialCode();
}