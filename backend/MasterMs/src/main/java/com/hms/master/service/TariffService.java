package com.hms.master.service;

import com.hms.master.entity.Tariff;
import com.hms.master.repository.TariffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TariffService {
    
    @Autowired
    private TariffRepository repository;
    
    public List<Tariff> getAllTariffs() {
        return repository.findAll();
    }
    
    public List<Tariff> getActiveTariffs() {
        return repository.findByIsActiveTrue();
    }
    
    public Optional<Tariff> getTariffById(Long id) {
        return repository.findById(id);
    }
    
    public Tariff createTariff(Tariff tariff) {
        return repository.save(tariff);
    }
    
    public Tariff updateTariff(Long id, Tariff tariff) {
        if (repository.existsById(id)) {
            tariff.setTariffId(id);
            return repository.save(tariff);
        }
        throw new RuntimeException("Tariff not found with id: " + id);
    }
    
    public void deleteTariff(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
        } else {
            throw new RuntimeException("Tariff not found with id: " + id);
        }
    }
}