package com.hms.master.repository;

import com.hms.master.entity.CashCounter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CashCounterRepository extends JpaRepository<CashCounter, Long> {
    List<CashCounter> findByCounterType(String counterType);
    List<CashCounter> findByCounterNameContainingIgnoreCase(String counterName);
    boolean existsByCounterName(String counterName);
    boolean existsBySystemName(String systemName);
}