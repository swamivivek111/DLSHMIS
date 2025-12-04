package com.hms.master.service.impl;

import com.hms.master.entity.Bed;
import com.hms.master.repository.BedRepository;
import com.hms.master.service.BedService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BedServiceImpl implements BedService {

    @Autowired
    private BedRepository bedRepository;

    @Override
    public Bed addBed(Bed bed) {
        return bedRepository.save(bed);
    }

    @Override
    public Bed updateBed(Long id, Bed bed) {
        Bed existingBed = bedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bed not found with id: " + id));
        
        existingBed.setWardId(bed.getWardId());
        existingBed.setWardName(bed.getWardName());
        existingBed.setRoomId(bed.getRoomId());
        existingBed.setRoomNumber(bed.getRoomNumber());
        existingBed.setBedNumber(bed.getBedNumber());
        existingBed.setBedType(bed.getBedType());
        existingBed.setBedStatus(bed.getBedStatus());
        existingBed.setCurrentPatientId(bed.getCurrentPatientId());
        existingBed.setLastCleanedDate(bed.getLastCleanedDate());
        existingBed.setBedChargesPerDay(bed.getBedChargesPerDay());
        existingBed.setVentilatorCharge(bed.getVentilatorCharge());
        existingBed.setMonitorCharge(bed.getMonitorCharge());
        existingBed.setNursingCharge(bed.getNursingCharge());
        existingBed.setSpecialEquipmentCharge(bed.getSpecialEquipmentCharge());
        existingBed.setOxygenPointAvailable(bed.getOxygenPointAvailable());
        existingBed.setMonitorAvailable(bed.getMonitorAvailable());
        existingBed.setSuctionPointAvailable(bed.getSuctionPointAvailable());
        
        return bedRepository.save(existingBed);
    }

    @Override
    public Bed getBedById(Long id) {
        return bedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bed not found with id: " + id));
    }

    @Override
    public void deleteBed(Long id) {
        if (!bedRepository.existsById(id)) {
            throw new RuntimeException("Bed not found with id: " + id);
        }
        bedRepository.deleteById(id);
    }

    @Override
    public Page<Bed> getAllBeds(int page, int limit, String search) {
        Pageable pageable = PageRequest.of(page, limit);
        return bedRepository.findAllWithSearch(search, pageable);
    }

    @Override
    public List<Bed> getAllBeds() {
        return bedRepository.findAll();
    }
}