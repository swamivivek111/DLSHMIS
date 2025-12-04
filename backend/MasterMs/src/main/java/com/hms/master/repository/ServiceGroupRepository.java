package com.hms.master.repository;

import com.hms.master.entity.ServiceGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ServiceGroupRepository extends JpaRepository<ServiceGroup, Long> {
    
    @Query("SELECT s FROM ServiceGroup s WHERE s.groupName LIKE %:groupName%")
    List<ServiceGroup> searchServiceGroups(@Param("groupName") String groupName);
    
    boolean existsByGroupName(String groupName);
    
    List<ServiceGroup> findByDepartmentId(Long departmentId);
}