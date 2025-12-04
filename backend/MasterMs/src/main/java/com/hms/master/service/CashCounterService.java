package com.hms.master.service;

import com.hms.master.entity.CashCounter;
import com.hms.master.repository.CashCounterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CashCounterService {
    
    @Autowired
    private CashCounterRepository repository;
    
    public List<CashCounter> getAllCashCounters() {
        return repository.findAll();
    }
    
    public Optional<CashCounter> getCashCounterById(Long id) {
        return repository.findById(id);
    }
    
    public CashCounter createCashCounter(CashCounter cashCounter) {
        return repository.save(cashCounter);
    }
    
    public CashCounter updateCashCounter(Long id, CashCounter cashCounter) {
        if (repository.existsById(id)) {
            cashCounter.setCashCounterId(id);
            return repository.save(cashCounter);
        }
        throw new RuntimeException("Cash Counter not found with id: " + id);
    }
    
    public void deleteCashCounter(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Cash Counter not found with id: " + id);
        }
    }
    
    public List<CashCounter> getCashCountersByType(CashCounter.CounterType counterType) {
        return repository.findByCounterType(counterType);
    }
    
    public List<CashCounter> searchCashCounters(String counterName) {
        return repository.findByCounterNameContainingIgnoreCase(counterName);
    }
}