package com.hms.master.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hms.master.dto.UserProfileRoleDTO;
import com.hms.master.entity.UserProfileRole;
import com.hms.master.exception.HMSException;

public interface UserProfileRoleService {

    UserProfileRoleDTO getByroleId(Long roleId) throws HMSException;

    List<UserProfileRoleDTO> getAllUserProfileRole(Long roleId);

    List<UserProfileRoleDTO> findByRoleId(Long roleId);

    Long createUserProfileRole(UserProfileRoleDTO userProfileRoleDTO);

    UserProfileRoleDTO updateUserProfileRole(Long roleId, UserProfileRoleDTO userProfileRoleDTO) throws HMSException;

    void deleteUserProfileRole(Long roleId) throws HMSException;

    public Page<UserProfileRole> findAll(String search, Pageable pageable);

}
