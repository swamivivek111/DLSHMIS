package com.hms.master.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hms.master.dto.TalukaDTO;
import com.hms.master.entity.Taluka;
import com.hms.master.exception.HMSException;
import com.hms.master.repository.TalukaRepository;

@Service
public class TalukaServiceImpl implements TalukaService{
    
    @Autowired
    private TalukaRepository talukaRepository;
    
    @Autowired 
	private APIService apiService;

    @Override
    public TalukaDTO getByTalukaId(Long talukaId) throws HMSException {
        return talukaRepository.findById(talukaId).orElseThrow(() -> new HMSException("COUNTRY_NOT_FOUND")).toDTO();
    }

    @Override
    public List<TalukaDTO> findByTalukaId(Long talukaId) {
        return talukaRepository.findById(talukaId).stream().map(Taluka::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<TalukaDTO> getAllTaluka(Long talukaId) {
        List<Taluka> talukas = (talukaId != null)
        ? talukaRepository.findByTalukaId(talukaId)
        : (List<Taluka>) talukaRepository.findAll();
        return talukas.stream().map(Taluka::toDTO).collect(Collectors.toList());
    }

    @Override
    public Long createTaluka(TalukaDTO talukaDTO) {
        Taluka taluka = talukaDTO.toEntity();
        taluka.setCreatedAt(LocalDateTime.now()); 
        taluka = talukaRepository.save(taluka);
        return taluka.toDTO().getTalukaId();
    }

    @Override
    public TalukaDTO updateTaluka(Long id, TalukaDTO talukaDTO) throws HMSException {
        Taluka existingTaluka = talukaRepository.findById(id).orElseThrow(() -> new HMSException("DEPARTMENT_NOT_FOUND"));
            existingTaluka.setDistrictId(talukaDTO.getDistrictId());
            existingTaluka.setTalukaName(talukaDTO.getTalukaName());
            existingTaluka.setTalukaCode(talukaDTO.getTalukaCode());
            existingTaluka.setUpdatedBy(talukaDTO.getUpdatedBy());
            existingTaluka.setActive(talukaDTO.getActive());
            existingTaluka.setUpdatedAt(LocalDateTime.now());
        Taluka updatedTaluka = talukaRepository.save(existingTaluka);
        return updatedTaluka.toDTO();
    }

    @Override
    public void deleteTaluka(Long id) throws HMSException {
        if (!talukaRepository.existsById(id)) {
            throw new HMSException("TALUKA_NOT_FOUND");
        }
        talukaRepository.deleteById(id);
    }

    @Override
    public Page<Taluka> findAll(String search, Pageable pageable) {
        if (search == null || search.isBlank()) {
            return talukaRepository.findAll(pageable);
        }
        return talukaRepository.findByTalukaNameContainingIgnoreCase(search, pageable);
    }

   
}
