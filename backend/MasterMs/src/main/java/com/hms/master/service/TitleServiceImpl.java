package com.hms.master.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hms.master.dto.TitleDTO;
import com.hms.master.entity.Title;
import com.hms.master.exception.HMSException;
import com.hms.master.repository.TitleRepository;

@Service
public class TitleServiceImpl implements TitleService{
    
    @Autowired
    private TitleRepository titleRepository;
    
    @Autowired 
	private APIService apiService;

    @Override
    public TitleDTO getByTitleId(Long titleId) throws HMSException {
        return titleRepository.findById(titleId).orElseThrow(() -> new HMSException("COUNTRY_NOT_FOUND")).toDTO();
    }

    @Override
    public List<TitleDTO> findByTitleId(Long titleId) {
        return titleRepository.findById(titleId).stream().map(Title::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<TitleDTO> getAllTitle(Long titleId) {
        List<Title> titles = (titleId != null)
        ? titleRepository.findByTitleId(titleId)
        : (List<Title>) titleRepository.findAll();
        return titles.stream().map(Title::toDTO).collect(Collectors.toList());
    }

    @Override
    public Long createTitle(TitleDTO titleDTO) {
        Title title = titleDTO.toEntity();
        title = titleRepository.save(title);
        return title.toDTO().getTitleId();
    }

    @Override
    public TitleDTO updateTitle(Long id, TitleDTO titleDTO) throws HMSException {
        Title existingTitle = titleRepository.findById(id).orElseThrow(() -> new HMSException("DEPARTMENT_NOT_FOUND"));
            existingTitle.setTitleName(titleDTO.getTitleName());
            existingTitle.setGender(titleDTO.getGender());
            existingTitle.setActive(titleDTO.getActive());
        Title updatedTitle = titleRepository.save(existingTitle);
        return updatedTitle.toDTO();
    }

    @Override
    public void deleteTitle(Long id) throws HMSException {
        if (!titleRepository.existsById(id)) {
            throw new HMSException("TITLE_NOT_FOUND");
        }
        titleRepository.deleteById(id);
    }

    @Override
    public Page<Title> findAll(String search, Pageable pageable) {
        if (search == null || search.isBlank()) {
            return titleRepository.findAll(pageable);
        }
        return titleRepository.findByTitleNameContainingIgnoreCase(search, pageable);
    }

   
}
