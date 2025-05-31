package com.hms.profile.service;

import com.hms.profile.dto.AdminDTO;
import com.hms.profile.exception.HMSException;

public interface AdminService {
    public Long addAdmin(AdminDTO adminDTO)throws HMSException;
    public AdminDTO getAdminById(Long id)throws HMSException;
    public AdminDTO updateAdmin(AdminDTO adminDTO)throws HMSException;
    public boolean exitAdminById(Long id) throws HMSException;
}
