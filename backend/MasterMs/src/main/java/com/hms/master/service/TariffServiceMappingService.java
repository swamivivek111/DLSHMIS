package com.hms.master.service;

import com.hms.master.entity.TariffServiceMapping;
import com.hms.master.repository.TariffServiceMappingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TariffServiceMappingService {
    
    @Autowired
    private TariffServiceMappingRepository repository;
    
    public List<TariffServiceMapping> getAllTariffServiceMappings() {
        return repository.findAll();
    }
    
    public Optional<TariffServiceMapping> getTariffServiceMappingById(Long id) {
        return repository.findById(id);
    }
    
    public TariffServiceMapping createTariffServiceMapping(TariffServiceMapping tariffServiceMapping) {
        return repository.save(tariffServiceMapping);
    }
    
    public TariffServiceMapping updateTariffServiceMapping(Long id, TariffServiceMapping tariffServiceMappingDetails) {
        TariffServiceMapping tariffServiceMapping = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Tariff service mapping not found"));
        
        tariffServiceMapping.setCompanyTariffCategoryId(tariffServiceMappingDetails.getCompanyTariffCategoryId());
        tariffServiceMapping.setGetServices(tariffServiceMappingDetails.getGetServices());
        tariffServiceMapping.setServiceId(tariffServiceMappingDetails.getServiceId());
        tariffServiceMapping.setServiceName(tariffServiceMappingDetails.getServiceName());
        tariffServiceMapping.setCorporateServiceName(tariffServiceMappingDetails.getCorporateServiceName());
        tariffServiceMapping.setQty(tariffServiceMappingDetails.getQty());
        tariffServiceMapping.setBaseRate(tariffServiceMappingDetails.getBaseRate());
        tariffServiceMapping.setCompanyTariffRate(tariffServiceMappingDetails.getCompanyTariffRate());
        tariffServiceMapping.setDiscountPerc(tariffServiceMappingDetails.getDiscountPerc());
        tariffServiceMapping.setDiscountAmount(tariffServiceMappingDetails.getDiscountAmount());
        tariffServiceMapping.setIsActive(tariffServiceMappingDetails.getIsActive());
        tariffServiceMapping.setUpdatedBy(tariffServiceMappingDetails.getUpdatedBy());
        
        return repository.save(tariffServiceMapping);
    }
    
    public void deleteTariffServiceMapping(Long id) {
        TariffServiceMapping tariffServiceMapping = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Tariff service mapping not found"));
        tariffServiceMapping.setIsActive(false);
        repository.save(tariffServiceMapping);
    }
    
    public List<TariffServiceMapping> searchTariffServiceMappings(String serviceName) {
        return repository.searchTariffServiceMappings(serviceName);
    }
    
    public List<TariffServiceMapping> getByServiceId(Long serviceId) {
        return repository.findByServiceId(serviceId);
    }
    
    public List<TariffServiceMapping> getByCompanyTariffCategoryId(Long companyTariffCategoryId) {
        return repository.findByCompanyTariffCategoryId(companyTariffCategoryId);
    }
}