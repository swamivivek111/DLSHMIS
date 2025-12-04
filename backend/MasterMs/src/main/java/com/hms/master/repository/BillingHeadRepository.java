package com.hms.master.repository;

import com.hms.master.entity.BillingHead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BillingHeadRepository extends JpaRepository<BillingHead, Long> {
    
    @Query("SELECT b FROM BillingHead b WHERE b.billingHeadName LIKE %:billingHeadName%")
    List<BillingHead> searchBillingHeads(@Param("billingHeadName") String billingHeadName);
    
    boolean existsByBillingHeadName(String billingHeadName);
}