package com.hms.master.service;

import com.hms.master.entity.ServiceMaster;
import com.hms.master.repository.ServiceMasterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceMasterService {
    
    @Autowired
    private ServiceMasterRepository repository;
    
    public List<ServiceMaster> getAllServices() {
        return repository.findAll();
    }
    
    public Optional<ServiceMaster> getServiceById(Long id) {
        return repository.findById(id);
    }
    
    public ServiceMaster createService(ServiceMaster serviceMaster) {
        if (repository.existsByServiceName(serviceMaster.getServiceName())) {
            throw new RuntimeException("Service name already exists");
        }
        return repository.save(serviceMaster);
    }
    
    public ServiceMaster updateService(Long id, ServiceMaster serviceMasterDetails) {
        ServiceMaster serviceMaster = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Service not found"));
        
        // Update all fields
        serviceMaster.setServiceName(serviceMasterDetails.getServiceName());
        serviceMaster.setDisplayName(serviceMasterDetails.getDisplayName());
        serviceMaster.setServiceGroupId(serviceMasterDetails.getServiceGroupId());
        serviceMaster.setServiceSubGroupId(serviceMasterDetails.getServiceSubGroupId());
        serviceMaster.setServiceClassId(serviceMasterDetails.getServiceClassId());
        serviceMaster.setServiceType(serviceMasterDetails.getServiceType());
        serviceMaster.setApplicableFor(serviceMasterDetails.getApplicableFor());
        serviceMaster.setBillingProcess(serviceMasterDetails.getBillingProcess());
        serviceMaster.setBillingHeadId(serviceMasterDetails.getBillingHeadId());
        serviceMaster.setEffectFrom(serviceMasterDetails.getEffectFrom());
        serviceMaster.setEffectTo(serviceMasterDetails.getEffectTo());
        
        // OPD Pricing
        serviceMaster.setOpdServicePrice(serviceMasterDetails.getOpdServicePrice());
        serviceMaster.setOpdEmergencyPrice(serviceMasterDetails.getOpdEmergencyPrice());
        serviceMaster.setOpdHospitalSharePct(serviceMasterDetails.getOpdHospitalSharePct());
        serviceMaster.setOpdHospitalPrice(serviceMasterDetails.getOpdHospitalPrice());
        serviceMaster.setOpdHospitalEmergencyPrice(serviceMasterDetails.getOpdHospitalEmergencyPrice());
        serviceMaster.setOpdDoctorPrice(serviceMasterDetails.getOpdDoctorPrice());
        serviceMaster.setOpdDoctorSharePct(serviceMasterDetails.getOpdDoctorSharePct());
        
        // IPD Pricing
        serviceMaster.setWardGroupNameId(serviceMasterDetails.getWardGroupNameId());
        serviceMaster.setIpdNormalPrice(serviceMasterDetails.getIpdNormalPrice());
        serviceMaster.setIpdDoctorSharePrice(serviceMasterDetails.getIpdDoctorSharePrice());
        serviceMaster.setIpdEmergencyPrice(serviceMasterDetails.getIpdEmergencyPrice());
        serviceMaster.setIpdDoctorShare(serviceMasterDetails.getIpdDoctorShare());
        
        // Additional Information
        serviceMaster.setUniversalCode(serviceMasterDetails.getUniversalCode());
        serviceMaster.setIsHavingUniversalCode(serviceMasterDetails.getIsHavingUniversalCode());
        serviceMaster.setMinAmt(serviceMasterDetails.getMinAmt());
        serviceMaster.setMaxAmt(serviceMasterDetails.getMaxAmt());
        serviceMaster.setIsPriceCaps(serviceMasterDetails.getIsPriceCaps());
        
        // Tax Information
        serviceMaster.setTaxId(serviceMasterDetails.getTaxId());
        serviceMaster.setTaxPercentage(serviceMasterDetails.getTaxPercentage());
        serviceMaster.setIsActive(serviceMasterDetails.getIsActive());
        
        // Options
        serviceMaster.setIsQtyEditable(serviceMasterDetails.getIsQtyEditable());
        serviceMaster.setIsDiet(serviceMasterDetails.getIsDiet());
        serviceMaster.setIsNonConsumableRequired(serviceMasterDetails.getIsNonConsumableRequired());
        serviceMaster.setIsNormalServiceCharges(serviceMasterDetails.getIsNormalServiceCharges());
        serviceMaster.setIsPriceEditable(serviceMasterDetails.getIsPriceEditable());
        serviceMaster.setIsEmergencyServiceCharges(serviceMasterDetails.getIsEmergencyServiceCharges());
        serviceMaster.setIsDoctorRequired(serviceMasterDetails.getIsDoctorRequired());
        serviceMaster.setIsTreatmentRoom(serviceMasterDetails.getIsTreatmentRoom());
        serviceMaster.setIsDoctorShareRequired(serviceMasterDetails.getIsDoctorShareRequired());
        
        return repository.save(serviceMaster);
    }
    
    public void deleteService(Long id) {
        ServiceMaster serviceMaster = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Service not found"));
        serviceMaster.setIsActive(false);
        repository.save(serviceMaster);
    }
    
    public List<ServiceMaster> searchServices(String serviceName) {
        return repository.searchServices(serviceName);
    }
}