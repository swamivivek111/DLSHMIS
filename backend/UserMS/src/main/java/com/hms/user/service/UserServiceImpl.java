package com.hms.user.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hms.user.dto.UserDTO;
import com.hms.user.entity.User;
import com.hms.user.exception.UserException;
import com.hms.user.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service("userService")//Use in case of multiple implemetation of UserService
@Transactional
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

	@Autowired 
	private APIService apiService;
    
	@Override
	public void resisterUser(UserDTO userDTO) throws UserException {
		
		Optional<User> opt=userRepository.findByEmail(userDTO.getEmail());
		if(opt.isPresent()){
			throw new UserException("USER_ALREADY_EXISTS");
		}
		userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
		Long profileId=apiService.addProfile(userDTO).block();//Calling of ProfileMS service from UserMS
		userDTO.setProfileId(profileId);
		userRepository.save(userDTO.toEntity());
	}

	@Override
	public UserDTO loginUser(UserDTO userDTO)throws UserException {
		User user=userRepository.findByEmail(userDTO.getEmail()).orElseThrow(()->new UserException("USER_NOT_FOUND"));
		
		if(!user.getActive()){
			throw new UserException("USER_INACTIVE");
		}
		
		if(!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())){
			throw new UserException("INVALID_CREDENTIALS");
		}
		user.setPassword(null);
		return user.toUserDTO();
	}

	@Override
	public UserDTO getUserById(Long id)throws UserException {
		return userRepository.findById(id).orElseThrow(()->new UserException("USER_NOT_FOUND")).toUserDTO();
	}

	@Override
	public void updateUser(UserDTO userDTO) {
		// TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemeted method 'updateUser'");
		
	}

	@Override
	public UserDTO getUser(String email) throws UserException {
		return userRepository.findByEmail(email).orElseThrow(()->new UserException("USER_NOT_FOUND")).toUserDTO();
	}

	@Override
	public boolean exitUserById(Long id) throws UserException {
		return userRepository.existsById(id);
	}

}
