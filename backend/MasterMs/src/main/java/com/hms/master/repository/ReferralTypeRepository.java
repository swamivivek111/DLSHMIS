package com.hms.master.repository;

import com.hms.master.entity.ReferralType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReferralTypeRepository extends JpaRepository<ReferralType, Long> {
    List<ReferralType> findByReferralTypeNameContainingIgnoreCase(String referralTypeName);
}