package com.hms.master.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hms.master.dto.UserMenuDTO;
import com.hms.master.entity.UserMenu;
import com.hms.master.exception.HMSException;
import com.hms.master.repository.UserMenuRepository;

@Service
public class UserMenuServiceImpl implements UserMenuService{
    
    @Autowired
    private UserMenuRepository userMenuRepository;
    
    @Autowired 
	private APIService apiService;

    @Override
    public UserMenuDTO getByid(Long id) throws HMSException {
        return userMenuRepository.findById(id).orElseThrow(() -> new HMSException("COUNTRY_NOT_FOUND")).toDTO();
    }

    @Override
    public List<UserMenuDTO> findByid(Long id) {
        return userMenuRepository.findById(id).stream().map(UserMenu::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<UserMenuDTO> getAllUserMenu(Long id) {
        List<UserMenu> userMenus = (id != null)
        ? userMenuRepository.findByid(id)
        : (List<UserMenu>) userMenuRepository.findAll();
        return userMenus.stream().map(UserMenu::toDTO).collect(Collectors.toList());
    }

    @Override
    public Long createUserMenu(UserMenuDTO userMenuDTO) {
        UserMenu userMenu = userMenuDTO.toEntity();
        userMenu.setCreatedAt(LocalDateTime.now());
        userMenu = userMenuRepository.save(userMenu);
        return userMenu.toDTO().getId();
    }

    @Override
    public UserMenuDTO updateUserMenu(Long id, UserMenuDTO userMenuDTO) throws HMSException {
        UserMenu existingUserMenu = userMenuRepository.findById(id).orElseThrow(() -> new HMSException("DEPARTMENT_NOT_FOUND"));
            existingUserMenu.setEmployeeCode(userMenuDTO.getEmployeeCode());
            existingUserMenu.setRoleName(userMenuDTO.getRoleName());
            existingUserMenu.setPermissions(userMenuDTO.getPermissions());
            existingUserMenu.setMenuFieldsList(userMenuDTO.getMenuFieldsList());
            existingUserMenu.setUpdatedAt(LocalDateTime.now());
        UserMenu updatedUserMenu = userMenuRepository.save(existingUserMenu);
        return updatedUserMenu.toDTO();
    }

    @Override
    public void deleteUserMenu(Long id) throws HMSException {
        if (!userMenuRepository.existsById(id)) {
            throw new HMSException("CITY_NOT_FOUND");
        }
        userMenuRepository.deleteById(id);
    }

    @Override
    public Page<UserMenu> findAll(String search, Pageable pageable) {
        if (search == null || search.isBlank()) {
            return userMenuRepository.findAll(pageable);
        }
        return userMenuRepository.findByEmployeeCodeContainingIgnoreCase(search, pageable);
    }

   
}
