package com.hms.master.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hms.master.dto.UserProfileRoleDTO;
import com.hms.master.entity.UserProfileRole;
import com.hms.master.exception.HMSException;
import com.hms.master.repository.UserProfileRoleRepository;

@Service
public class UserProfileRoleServiceImpl implements UserProfileRoleService{
    
    @Autowired
    private UserProfileRoleRepository userProfileRoleRepository;
    
    @Autowired 
	private APIService apiService;

    @Override
    public UserProfileRoleDTO getByroleId(Long roleId) throws HMSException {
        return userProfileRoleRepository.findById(roleId).orElseThrow(() -> new HMSException("COUNTRY_NOT_FOUND")).toDTO();
    }

    @Override
    public List<UserProfileRoleDTO> findByRoleId(Long roleId) {
        return userProfileRoleRepository.findById(roleId).stream().map(UserProfileRole::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<UserProfileRoleDTO> getAllUserProfileRole(Long roleId) {
        List<UserProfileRole> userProfileRoles = (roleId != null)
        ? userProfileRoleRepository.findByRoleId(roleId)
        : (List<UserProfileRole>) userProfileRoleRepository.findAll();
        return userProfileRoles.stream().map(UserProfileRole::toDTO).collect(Collectors.toList());
    }

    @Override
    public Long createUserProfileRole(UserProfileRoleDTO userProfileRoleDTO) {
        UserProfileRole userProfileRole = userProfileRoleDTO.toEntity();
        userProfileRole.setCreatedAt(LocalDateTime.now());
        userProfileRole = userProfileRoleRepository.save(userProfileRole);
        return userProfileRole.toDTO().getRoleId();
    }

    @Override
    public UserProfileRoleDTO updateUserProfileRole(Long id, UserProfileRoleDTO userProfileRoleDTO) throws HMSException {
        UserProfileRole existingUserProfileRole = userProfileRoleRepository.findById(id).orElseThrow(() -> new HMSException("DEPARTMENT_NOT_FOUND"));
            existingUserProfileRole.setRoleName(userProfileRoleDTO.getRoleName());
            existingUserProfileRole.setDescription(userProfileRoleDTO.getDescription());
            existingUserProfileRole.setAccessLevel(userProfileRoleDTO.getAccessLevel());
            existingUserProfileRole.setActive(userProfileRoleDTO.getActive());
            existingUserProfileRole.setUpdatedBy(userProfileRoleDTO.getUpdatedBy());
            existingUserProfileRole.setUpdatedAt(LocalDateTime.now());
        UserProfileRole updatedUserProfileRole = userProfileRoleRepository.save(existingUserProfileRole);
        return updatedUserProfileRole.toDTO();
    }

    @Override
    public void deleteUserProfileRole(Long id) throws HMSException {
        if (!userProfileRoleRepository.existsById(id)) {
            throw new HMSException("CITY_NOT_FOUND");
        }
        userProfileRoleRepository.deleteById(id);
    }

    @Override
    public Page<UserProfileRole> findAll(String search, Pageable pageable) {
        if (search == null || search.isBlank()) {
            return userProfileRoleRepository.findAll(pageable);
        }
        return userProfileRoleRepository.findByRoleNameContainingIgnoreCase(search, pageable);
    }

   
}
