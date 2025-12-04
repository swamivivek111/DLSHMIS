package com.hms.master.repository;

import com.hms.master.entity.ServiceMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServiceMasterRepository extends JpaRepository<ServiceMaster, Long> {
    
    @Query("SELECT s FROM ServiceMaster s WHERE s.serviceName LIKE %:serviceName%")
    List<ServiceMaster> searchServices(@Param("serviceName") String serviceName);
    
    boolean existsByServiceName(String serviceName);
}