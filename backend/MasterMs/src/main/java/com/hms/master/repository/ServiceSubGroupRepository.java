package com.hms.master.repository;

import com.hms.master.entity.ServiceSubGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServiceSubGroupRepository extends JpaRepository<ServiceSubGroup, Long> {
    
    @Query("SELECT s FROM ServiceSubGroup s WHERE s.subGroupName LIKE %:subGroupName%")
    List<ServiceSubGroup> searchServiceSubGroups(@Param("subGroupName") String subGroupName);
    
    boolean existsBySubGroupName(String subGroupName);
    
    List<ServiceSubGroup> findByGroupId(Long groupId);
}