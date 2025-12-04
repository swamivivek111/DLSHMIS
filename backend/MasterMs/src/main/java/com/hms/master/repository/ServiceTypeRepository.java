package com.hms.master.repository;

import com.hms.master.entity.ServiceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServiceTypeRepository extends JpaRepository<ServiceType, Long> {
    List<ServiceType> findByServiceClassName(Long serviceClassName);
    List<ServiceType> findByServiceClassTypeNameContainingIgnoreCase(String serviceClassTypeName);
}