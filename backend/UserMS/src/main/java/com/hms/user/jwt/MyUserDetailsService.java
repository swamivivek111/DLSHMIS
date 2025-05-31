package com.hms.user.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hms.user.dto.UserDTO;
import com.hms.user.exception.UserException;
import com.hms.user.service.UserService;

@Service
public class MyUserDetailsService implements UserDetailsService{

    @Autowired
    UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {//username
        try{
            UserDTO userDTO=userService.getUser(email);
            return new CustomUserDetails(userDTO.getId(), userDTO.getEmail(), userDTO.getEmail(), userDTO.getPassword(), userDTO.getRole(), userDTO.getName(), userDTO.getProfileId(), null);
        }catch(UserException e){
            e.printStackTrace();
        }
        return null;
    }
    
}
