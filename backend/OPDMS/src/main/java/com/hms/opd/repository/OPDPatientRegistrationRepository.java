package com.hms.opd.repository;

import com.hms.opd.entity.OPDPatientRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface OPDPatientRegistrationRepository extends JpaRepository<OPDPatientRegistration, Long> {
    
    Optional<OPDPatientRegistration> findByPrnNumber(String prnNumber);
    
    @Query("SELECT COALESCE(MAX(CAST(SUBSTRING(p.prnNumber, 4) AS int)), 0) FROM OPDPatientRegistration p WHERE p.prnNumber LIKE 'PRN%'")
    Integer findMaxPatientNumber();
    
    boolean existsByPrnNumber(String prnNumber);
    
    boolean existsByMobile(String mobile);
}