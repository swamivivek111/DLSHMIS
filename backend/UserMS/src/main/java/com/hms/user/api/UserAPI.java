package com.hms.user.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.user.dto.LoginDTO;
import com.hms.user.dto.ResponseDTO;
import com.hms.user.dto.UserDTO;
import com.hms.user.exception.UserException;
import com.hms.user.jwt.JwtUtil;
import com.hms.user.service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/user")
@Validated//For UserDTO validations
@CrossOrigin//Opentoall as of now
public class UserAPI {
    @Autowired
    UserService userService;

    @Autowired 
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> registerUser(@RequestBody @Valid UserDTO userDTO)throws UserException{//@Valid For UserDTO validations
        userService.resisterUser(userDTO);
        return new ResponseEntity<ResponseDTO>(new ResponseDTO("User created successfuly!"), HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody @Valid LoginDTO loginDTO)throws UserException{
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
        } catch (AuthenticationException e) {
            throw new UserException("INVALID_CREDENTIALS");
        }
        final UserDetails userDetails=userDetailsService.loadUserByUsername(loginDTO.getEmail());
        final String jwt=jwtUtil.generateToken(userDetails);
        return new ResponseEntity<>(jwt, HttpStatus.OK);
    }

    @GetMapping("/exists/{id}")
    public ResponseEntity<Boolean> isExists(@PathVariable Long id) throws UserException {
        return ResponseEntity.ok(userService.exitUserById(id));
    }
    
    
}
