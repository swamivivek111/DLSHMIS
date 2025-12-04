package com.hms.master.service;

import com.hms.master.entity.Ward;
import org.springframework.data.domain.Page;

import java.util.List;

public interface WardService {
    Ward addWard(Ward ward);
    Ward updateWard(Long id, Ward ward);
    Ward getWardById(Long id);
    void deleteWard(Long id);
    Page<Ward> getAllWards(int page, int limit, String search);
    List<Ward> getAllWards();
}