package com.hms.master.repository;

import com.hms.master.entity.ReferralName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReferralNameRepository extends JpaRepository<ReferralName, Long> {
    List<ReferralName> findByReferralTypeId(Long referralTypeId);
    List<ReferralName> findByReferralNameContainingIgnoreCase(String referralName);
}