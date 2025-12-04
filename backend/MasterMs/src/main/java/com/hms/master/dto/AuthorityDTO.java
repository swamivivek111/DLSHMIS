package com.hms.master.dto;

import java.time.LocalDateTime;
import com.hms.master.entity.Authority;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthorityDTO {
    private Long authorityId;
    private String authorityCode;
    private String authorityName;
    private String approvalLimit;
    private Boolean isActive;
    private Integer createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Authority toEntity() {
        Authority authority = new Authority();
        authority.setAuthorityId(authorityId);
        authority.setAuthorityCode(authorityCode);
        authority.setAuthorityName(authorityName);
        authority.setApprovalLimit(approvalLimit);
        authority.setIsActive(isActive);
        authority.setCreatedBy(createdBy);
        return authority;
    }
}