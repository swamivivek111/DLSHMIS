package com.hms.master.repository;

import com.hms.master.entity.WardGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface WardGroupRepository extends JpaRepository<WardGroup, Long> {
    
    @Query("SELECT w FROM WardGroup w WHERE w.wardGroupName LIKE %:wardGroupName%")
    List<WardGroup> searchWardGroups(@Param("wardGroupName") String wardGroupName);
    
    boolean existsByWardGroupName(String wardGroupName);
}