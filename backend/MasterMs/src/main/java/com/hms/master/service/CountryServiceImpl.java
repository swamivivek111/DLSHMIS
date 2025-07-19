package com.hms.master.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hms.master.dto.CountryDTO;
import com.hms.master.entity.Country;
import com.hms.master.exception.HMSException;
import com.hms.master.repository.CountryRepository;

@Service
public class CountryServiceImpl implements CountryService{
    
    @Autowired
    private CountryRepository countryRepository;
    
    @Autowired 
	private APIService apiService;

    @Override
    public CountryDTO getByCountryId(Long countryId) throws HMSException {
        return countryRepository.findById(countryId).orElseThrow(() -> new HMSException("COUNTRY_NOT_FOUND")).toDTO();
    }

    @Override
    public List<CountryDTO> findByCountryId(Long countryId) {
        return countryRepository.findById(countryId).stream().map(Country::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<CountryDTO> getAllCountry(Long countryId) {
        List<Country> countrys = (countryId != null)
        ? countryRepository.findBycountryId(countryId)
        : (List<Country>) countryRepository.findAll();
        return countrys.stream().map(Country::toDTO).collect(Collectors.toList());
    }

    @Override
    public Long createCountry(CountryDTO countryDTO) {
        Country country = countryDTO.toEntity();
        country.setCreatedAt(LocalDateTime.now()); 
        country = countryRepository.save(country);
        return country.toDTO().getCountryId();
    }

    @Override
    public CountryDTO updateCountry(Long countryId, CountryDTO countryDTO) throws HMSException {
        Country existingCountry = countryRepository.findById(countryId).orElseThrow(() -> new HMSException("DEPARTMENT_NOT_FOUND"));
            existingCountry.setCountryName(countryDTO.getCountryName());
            existingCountry.setCountryCode(countryDTO.getCountryCode());
            existingCountry.setUpdatedBy(countryDTO.getUpdatedBy());
            existingCountry.setActive(countryDTO.getActive());
            existingCountry.setUpdatedAt(LocalDateTime.now());
        Country updatedCountry = countryRepository.save(existingCountry);
        return updatedCountry.toDTO();
    }

    @Override
    public void deleteCountry(Long countryId) throws HMSException {
        if (!countryRepository.existsById(countryId)) {
            throw new HMSException("COUNTRY_NOT_FOUND");
        }
        countryRepository.deleteById(countryId);
    }

    @Override
    public Page<Country> findAll(String search, Pageable pageable) {
        if (search == null || search.isBlank()) {
            return countryRepository.findAll(pageable);
        }
        return countryRepository.findByCountryNameContainingIgnoreCase(search, pageable);
    }

   
}
