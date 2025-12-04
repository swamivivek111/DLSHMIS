package com.hms.master.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.master.dto.StateDTO;
import com.hms.master.entity.State;
import com.hms.master.exception.HMSException;
import com.hms.master.service.StateService;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@RestController
@CrossOrigin
@Validated
@RequestMapping("/master/state")
public class StateAPI {
    @Autowired 
    private StateService stateService;

    @PostMapping("/add")    
    public ResponseEntity<Map<String, Object>> createState(@RequestBody StateDTO stateDTO) throws HMSException {
        Long id = stateService.createState(stateDTO);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "State created successfully!");
        response.put("stateId", id);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/update/{stateId}")
    public ResponseEntity<Map<String, Object>> updateState(@PathVariable Long stateId, @RequestBody StateDTO dto) throws HMSException {
        StateDTO updated = stateService.updateState(stateId, dto);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "State updated successfully!");
        response.put("data", updated);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{stateId}")
    public ResponseEntity<Map<String, Object>> deleteState(@PathVariable Long stateId) throws HMSException {
        stateService.deleteState(stateId);
        Map<String, Object> response = new HashMap<>();
        response.put("message", "State deleted successfully!");
        response.put("StateId", stateId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/get/{stateId}")
    public ResponseEntity<StateDTO> getStateById(@PathVariable Long stateId) throws HMSException {
        return new ResponseEntity<>(stateService.getByStateId(stateId), HttpStatus.OK);
    }

    @GetMapping("/getall")
    public ResponseEntity<Map<String, Object>> getAllStates(@RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int limit, @RequestParam(defaultValue = "") String search) {
        
        try {
            Pageable pageable = PageRequest.of(page, limit);
            Page<State> states = stateService.findAll(search, pageable);
            
            List<StateDTO> stateDTOs = states.getContent().stream()
                .map(State::toDTO)
                .collect(Collectors.toList());
            
            Map<String, Object> response = new HashMap<>();
            response.put("states", stateDTOs);
            response.put("totalPages", states.getTotalPages());
            response.put("totalItems", states.getTotalElements()); 

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to fetch states: " + e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
