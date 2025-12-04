package com.hms.master.repository;

import com.hms.master.entity.TariffServiceMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TariffServiceMappingRepository extends JpaRepository<TariffServiceMapping, Long> {
    
    @Query("SELECT t FROM TariffServiceMapping t WHERE t.serviceName LIKE %:serviceName% OR t.corporateServiceName LIKE %:serviceName%")
    List<TariffServiceMapping> searchTariffServiceMappings(@Param("serviceName") String serviceName);
    
    List<TariffServiceMapping> findByServiceId(Long serviceId);
    
    List<TariffServiceMapping> findByCompanyTariffCategoryId(Long companyTariffCategoryId);
}