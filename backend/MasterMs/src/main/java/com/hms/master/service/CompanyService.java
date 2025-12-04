package com.hms.master.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.hms.master.dto.CompanyDTO;
import com.hms.master.entity.Company;
import com.hms.master.repository.CompanyRepository;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public Page<CompanyDTO> getAllCompanies(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("companyName").ascending());
        Page<Company> companies = companyRepository.findAllWithSearch(search, pageable);
        return companies.map(Company::toDTO);
    }

    public List<CompanyDTO> getAllActiveCompanies() {
        List<Company> companies = companyRepository.findByIsActiveTrue();
        return companies.stream().map(Company::toDTO).toList();
    }

    public Optional<CompanyDTO> getCompanyById(Long id) {
        return companyRepository.findById(id).map(Company::toDTO);
    }

    public CompanyDTO createCompany(CompanyDTO companyDTO) {
        validateCompanyForCreate(companyDTO);
        Company company = companyDTO.toEntity();
        Company savedCompany = companyRepository.save(company);
        return savedCompany.toDTO();
    }

    public CompanyDTO updateCompany(Long id, CompanyDTO companyDTO) {
        Company existingCompany = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
        
        validateCompanyForUpdate(companyDTO, id);
        
        existingCompany.setCompanyCode(companyDTO.getCompanyCode());
        existingCompany.setCompanyName(companyDTO.getCompanyName());
        existingCompany.setCompanyType(companyDTO.getCompanyType());
        existingCompany.setAddress(companyDTO.getAddress());
        existingCompany.setEmail(companyDTO.getEmail());
        existingCompany.setPhone(companyDTO.getPhone());
        existingCompany.setEffectiveFrom(companyDTO.getEffectiveFrom());
        existingCompany.setEffectiveTo(companyDTO.getEffectiveTo());
        existingCompany.setOrgPercentage(companyDTO.getOrgPercentage());
        existingCompany.setEmpPercentage(companyDTO.getEmpPercentage());
        existingCompany.setIsActive(companyDTO.getIsActive());

        Company updatedCompany = companyRepository.save(existingCompany);
        return updatedCompany.toDTO();
    }

    public void deleteCompany(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found with id: " + id));
        companyRepository.delete(company);
    }

    private void validateCompanyForCreate(CompanyDTO companyDTO) {
        if (companyRepository.existsByCompanyCode(companyDTO.getCompanyCode())) {
            throw new RuntimeException("Company with code '" + companyDTO.getCompanyCode() + "' already exists");
        }
        if (companyRepository.existsByCompanyName(companyDTO.getCompanyName())) {
            throw new RuntimeException("Company with name '" + companyDTO.getCompanyName() + "' already exists");
        }
    }

    private void validateCompanyForUpdate(CompanyDTO companyDTO, Long id) {
        if (companyRepository.existsByCompanyCodeAndCompanyIdNot(companyDTO.getCompanyCode(), id)) {
            throw new RuntimeException("Company with code '" + companyDTO.getCompanyCode() + "' already exists");
        }
        if (companyRepository.existsByCompanyNameAndCompanyIdNot(companyDTO.getCompanyName(), id)) {
            throw new RuntimeException("Company with name '" + companyDTO.getCompanyName() + "' already exists");
        }
    }
}