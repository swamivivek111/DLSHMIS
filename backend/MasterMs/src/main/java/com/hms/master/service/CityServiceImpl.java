package com.hms.master.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hms.master.dto.CityDTO;
import com.hms.master.entity.City;
import com.hms.master.exception.HMSException;
import com.hms.master.repository.CityRepository;

@Service
public class CityServiceImpl implements CityService{
    
    @Autowired
    private CityRepository cityRepository;
    
    @Autowired 
	private APIService apiService;

    @Override
    public CityDTO getByCityId(Long cityId) throws HMSException {
        return cityRepository.findById(cityId).orElseThrow(() -> new HMSException("COUNTRY_NOT_FOUND")).toDTO();
    }

    @Override
    public List<CityDTO> findByCityId(Long cityId) {
        return cityRepository.findById(cityId).stream().map(City::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<CityDTO> getAllCity(Long cityId) {
        List<City> citys = (cityId != null)
        ? cityRepository.findByCityId(cityId)
        : (List<City>) cityRepository.findAll();
        return citys.stream().map(City::toDTO).collect(Collectors.toList());
    }

    @Override
    public Long createCity(CityDTO cityDTO) {
        City city = cityDTO.toEntity();
        city.setCreatedAt(LocalDateTime.now());
        city = cityRepository.save(city);
        return city.toDTO().getCityId();
    }

    @Override
    public CityDTO updateCity(Long id, CityDTO cityDTO) throws HMSException {
        City existingCity = cityRepository.findById(id).orElseThrow(() -> new HMSException("DEPARTMENT_NOT_FOUND"));
            existingCity.setTalukaId(cityDTO.getTalukaId());
            existingCity.setCityName(cityDTO.getCityName());
            existingCity.setPinCode(cityDTO.getPinCode());
            existingCity.setActive(cityDTO.getActive());
            existingCity.setUpdatedBy(cityDTO.getUpdatedBy());
            existingCity.setUpdatedAt(LocalDateTime.now());
        City updatedCity = cityRepository.save(existingCity);
        return updatedCity.toDTO();
    }

    @Override
    public void deleteCity(Long id) throws HMSException {
        if (!cityRepository.existsById(id)) {
            throw new HMSException("CITY_NOT_FOUND");
        }
        cityRepository.deleteById(id);
    }

    @Override
    public Page<City> findAll(String search, Pageable pageable) {
        if (search == null || search.isBlank()) {
            return cityRepository.findAll(pageable);
        }
        return cityRepository.findByCityNameContainingIgnoreCase(search, pageable);
    }

   
}
