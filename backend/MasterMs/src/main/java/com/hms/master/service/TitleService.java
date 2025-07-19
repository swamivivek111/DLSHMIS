package com.hms.master.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hms.master.dto.TitleDTO;
import com.hms.master.entity.Title;
import com.hms.master.exception.HMSException;

public interface TitleService {

    TitleDTO getByTitleId(Long titleId) throws HMSException;

    List<TitleDTO> getAllTitle(Long titleId);

    List<TitleDTO> findByTitleId(Long titleId);

    Long createTitle(TitleDTO titleDTO);

    TitleDTO updateTitle(Long titleId, TitleDTO titleDTO) throws HMSException;

    void deleteTitle(Long titleId) throws HMSException;

    public Page<Title> findAll(String search, Pageable pageable);

}
