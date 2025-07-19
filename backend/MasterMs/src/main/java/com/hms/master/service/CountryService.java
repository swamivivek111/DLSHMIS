package com.hms.master.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hms.master.dto.CountryDTO;
import com.hms.master.entity.Country;
import com.hms.master.exception.HMSException;

public interface CountryService {

    CountryDTO getByCountryId(Long countryId) throws HMSException;

    List<CountryDTO> getAllCountry(Long countryId);

    List<CountryDTO> findByCountryId(Long countryId);

    Long createCountry(CountryDTO countryDTO);

    CountryDTO updateCountry(Long countryId, CountryDTO countryDTO) throws HMSException;

    void deleteCountry(Long countryId) throws HMSException;

    public Page<Country> findAll(String search, Pageable pageable);

}
