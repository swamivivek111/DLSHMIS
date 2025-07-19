package com.hms.master.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hms.master.dto.StateDTO;
import com.hms.master.entity.State;
import com.hms.master.exception.HMSException;

public interface StateService {

    StateDTO getByStateId(Long stateId) throws HMSException;

    List<StateDTO> getAllState();

    List<StateDTO> findByStateId(Long stateId);

    Long createState(StateDTO stateDTO);

    StateDTO updateState(Long stateId, StateDTO stateDTO) throws HMSException;

    void deleteState(Long stateId) throws HMSException;

    public Page<State> findAll(String search, Pageable pageable);

}
