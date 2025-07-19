package com.hms.master.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hms.master.dto.UserMenuDTO;
import com.hms.master.entity.UserMenu;
import com.hms.master.exception.HMSException;

public interface UserMenuService {

    UserMenuDTO getByid(Long id) throws HMSException;

    List<UserMenuDTO> getAllUserMenu(Long id);

    List<UserMenuDTO> findByid(Long id);

    Long createUserMenu(UserMenuDTO userMenuDTO);

    UserMenuDTO updateUserMenu(Long id, UserMenuDTO userMenuDTO) throws HMSException;

    void deleteUserMenu(Long id) throws HMSException;

    public Page<UserMenu> findAll(String search, Pageable pageable);

}
