package com.hms.user.service;

import com.hms.user.dto.UserDTO;
import com.hms.user.exception.UserException;

public interface UserService {
    public void resisterUser(UserDTO userDTO)throws UserException;
    public UserDTO loginUser(UserDTO userDTO)throws UserException;
    public UserDTO getUserById(Long id)throws UserException;
    public void updateUser(UserDTO userDTO);
    public UserDTO getUser(String email)throws UserException;
    public boolean exitUserById(Long id)throws UserException;
}
