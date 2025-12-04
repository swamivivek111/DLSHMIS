package com.hms.master.service;

import com.hms.master.entity.Bed;
import org.springframework.data.domain.Page;

import java.util.List;

public interface BedService {
    Bed addBed(Bed bed);
    Bed updateBed(Long id, Bed bed);
    Bed getBedById(Long id);
    void deleteBed(Long id);
    Page<Bed> getAllBeds(int page, int limit, String search);
    List<Bed> getAllBeds();
}