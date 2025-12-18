package com.hms.master.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.hms.master.dto.AuthorityDTO;
import com.hms.master.entity.Authority;
import com.hms.master.repository.AuthorityRepository;

@Service
public class AuthorityService {

    @Autowired
    private AuthorityRepository repository;
    
    @Autowired
    private ObjectMapper objectMapper;

    public Page<AuthorityDTO> getAllAuthorities(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("authorityName").ascending());
        Page<Authority> authorities = repository.findAllWithSearch(search, pageable);
        return authorities.map(Authority::toDTO);
    }

    public List<AuthorityDTO> getAllActiveAuthorities() {
        return repository.findByIsActiveTrue().stream().map(Authority::toDTO).toList();
    }

    public Optional<AuthorityDTO> getAuthorityById(Long id) {
        return repository.findById(id).map(Authority::toDTO);
    }

    public AuthorityDTO createAuthority(AuthorityDTO dto) {
        if (repository.existsByAuthorityCode(dto.getAuthorityCode())) {
            throw new RuntimeException("Authority code already exists");
        }
        if (repository.existsByAuthorityName(dto.getAuthorityName())) {
            throw new RuntimeException("Authority name already exists");
        }
        Authority authority = dto.toEntity();
        return repository.save(authority).toDTO();
    }

    public AuthorityDTO updateAuthority(Long id, AuthorityDTO dto) {
        Authority existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Authority not found"));
        
        if (repository.existsByAuthorityCodeAndAuthorityIdNot(dto.getAuthorityCode(), id)) {
            throw new RuntimeException("Authority code already exists");
        }
        if (repository.existsByAuthorityNameAndAuthorityIdNot(dto.getAuthorityName(), id)) {
            throw new RuntimeException("Authority name already exists");
        }
        
        existing.setAuthorityCode(dto.getAuthorityCode());
        existing.setAuthorityName(dto.getAuthorityName());

        existing.setIsActive(dto.getIsActive());
        existing.setCreatedBy(dto.getCreatedBy());
        existing.setTransactions(dto.getTransactions());
        
        return repository.save(existing).toDTO();
    }

    public void deleteAuthority(Long id) {
        repository.deleteById(id);
    }
}