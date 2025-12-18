package com.hms.master.dto;

import java.time.LocalDateTime;
import com.hms.master.entity.Authority;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthorityDTO {
    private Long authorityId;
    private String authorityCode;
    private String authorityName;

    private Boolean isActive;
    private Integer createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String transactions;
    
    public AuthorityDTO(Long authorityId, String authorityCode, String authorityName, 
                       Boolean isActive, Integer createdBy, 
                       LocalDateTime createdAt, LocalDateTime updatedAt, String transactions) {
        this.authorityId = authorityId;
        this.authorityCode = authorityCode;
        this.authorityName = authorityName;
        this.isActive = isActive;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.transactions = transactions;
    }

    public Authority toEntity() {
        Authority authority = new Authority();
        authority.setAuthorityId(authorityId);
        authority.setAuthorityCode(authorityCode);
        authority.setAuthorityName(authorityName);

        authority.setIsActive(isActive);
        authority.setCreatedBy(createdBy);
        authority.setTransactions(transactions);
        return authority;
    }
}