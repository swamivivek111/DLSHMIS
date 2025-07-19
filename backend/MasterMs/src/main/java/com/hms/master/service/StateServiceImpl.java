package com.hms.master.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hms.master.dto.StateDTO;
import com.hms.master.entity.Country;
import com.hms.master.entity.State;
import com.hms.master.exception.HMSException;
import com.hms.master.repository.CountryRepository;
import com.hms.master.repository.StateRepository;

@Service
public class StateServiceImpl implements StateService{
    
    @Autowired
    private StateRepository stateRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired 
	private APIService apiService;

    @Override
    public StateDTO getByStateId(Long stateId) throws HMSException {
        return stateRepository.findById(stateId).orElseThrow(() -> new HMSException("COUNTRY_NOT_FOUND")).toDTO();
    }

    @Override
    public List<StateDTO> findByStateId(Long stateId) {
        return stateRepository.findByStateId(stateId).stream().map(State::toDTO).collect(Collectors.toList());
    }

    @Override
        public List<StateDTO> getAllState() {
        
    Iterable<State> iterable = stateRepository.findAll();
    List<StateDTO> list = StreamSupport.stream(iterable.spliterator(), false)
                                       .map(State::toDTO)
                                       .collect(Collectors.toList());
    return list;// no need to cast
        /*List<State> states = (stateId != null)
        ? stateRepository.findByStateId(stateId)
        : (List<State>) stateRepository.findAll();
        return states.stream().map(State::toDTO).collect(Collectors.toList());*/
    }

    @Override
    public Long createState(StateDTO stateDTO) {

        Country country= (Country) countryRepository.findBycountryId(stateDTO.getCountryId());
        State state = stateDTO.toEntity(country);

        state.setCreatedAt(LocalDateTime.now()); 
        state = stateRepository.save(state);
        return state.toDTO().getStateId();
    }

    @Override
    public StateDTO updateState(Long stateId, StateDTO stateDTO) throws HMSException {
        State existingState = stateRepository.findById(stateId).orElseThrow(() -> new HMSException("DEPARTMENT_NOT_FOUND"));
            existingState.setCountry((Country) countryRepository.findBycountryId(stateDTO.getCountryId()));
            existingState.setStateName(stateDTO.getStateName());
            existingState.setStateCode(stateDTO.getStateCode());
            existingState.setUpdatedBy(stateDTO.getUpdatedBy());
            existingState.setActive(stateDTO.getActive());
            existingState.setUpdatedAt(LocalDateTime.now());
        State updatedState = stateRepository.save(existingState);
        return updatedState.toDTO();
    }

    @Override
    public void deleteState(Long stateId) throws HMSException {
        if (!stateRepository.existsById(stateId)) {
            throw new HMSException("COUNTRY_NOT_FOUND");
        }
        stateRepository.deleteById(stateId);
    }

    @Override
    public Page<State> findAll(String search, Pageable pageable) {
        if (search == null || search.isBlank()) {
            return stateRepository.findAll(pageable);
        }
        return stateRepository.findByStateNameContainingIgnoreCase(search, pageable);
    }

   
}
