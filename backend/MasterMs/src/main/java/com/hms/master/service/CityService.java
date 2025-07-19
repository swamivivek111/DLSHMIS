package com.hms.master.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hms.master.dto.CityDTO;
import com.hms.master.entity.City;
import com.hms.master.exception.HMSException;

public interface CityService {

    CityDTO getByCityId(Long cityId) throws HMSException;

    List<CityDTO> getAllCity(Long cityId);

    List<CityDTO> findByCityId(Long cityId);

    Long createCity(CityDTO cityDTO);

    CityDTO updateCity(Long cityId, CityDTO cityDTO) throws HMSException;

    void deleteCity(Long cityId) throws HMSException;

    public Page<City> findAll(String search, Pageable pageable);

}
