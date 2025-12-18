package com.hms.master.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.hms.master.entity.Company;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDTO {
    private Long companyId;
    private String companyCode;
    private String companyName;
    private String companyType;
    private String address;
    private String email;
    private String phone;
    private LocalDate effectiveFrom;
    private LocalDate effectiveTo;
    private String orgPercentage;
    private String empPercentage;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Company toEntity() {
        Company company = new Company();
        company.setCompanyId(companyId);
        company.setCompanyCode(companyCode);
        company.setCompanyName(companyName);
        company.setCompanyType(companyType);
        company.setAddress(address);
        company.setEmail(email);
        company.setPhone(phone);
        company.setEffectiveFrom(effectiveFrom);
        company.setEffectiveTo(effectiveTo);
        company.setOrgPercentage(orgPercentage);
        company.setEmpPercentage(empPercentage);
        company.setIsActive(isActive);
        return company;
    }
}