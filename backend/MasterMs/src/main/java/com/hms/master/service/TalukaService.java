package com.hms.master.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hms.master.dto.TalukaDTO;
import com.hms.master.entity.Taluka;
import com.hms.master.exception.HMSException;

public interface TalukaService {

    TalukaDTO getByTalukaId(Long talukaId) throws HMSException;

    List<TalukaDTO> getAllTaluka(Long talukaId);

    List<TalukaDTO> findByTalukaId(Long talukaId);

    Long createTaluka(TalukaDTO talukaDTO);

    TalukaDTO updateTaluka(Long talukaId, TalukaDTO talukaDTO) throws HMSException;

    void deleteTaluka(Long talukaId) throws HMSException;

    public Page<Taluka> findAll(String search, Pageable pageable);

}
