package com.hms.master.repository;

import com.hms.master.entity.ServiceClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServiceClassRepository extends JpaRepository<ServiceClass, Long> {
    
    @Query("SELECT s FROM ServiceClass s WHERE s.serviceClassName LIKE %:serviceClassName%")
    List<ServiceClass> searchServiceClasses(@Param("serviceClassName") String serviceClassName);
    
    boolean existsByServiceClassName(String serviceClassName);
}