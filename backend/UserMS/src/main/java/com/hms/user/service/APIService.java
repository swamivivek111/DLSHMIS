package com.hms.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.hms.user.dto.Roles;
import com.hms.user.dto.UserDTO;

import reactor.core.publisher.Mono;

@Service
public class APIService {
    @Autowired
    private WebClient.Builder webClient;
    
    @Value("${profile.service.url}")
    private String profileServiceUrl;

    public Mono<Long> addProfile(UserDTO userDTO){
        if(userDTO.getRole().equals(Roles.Doctor)){
            return webClient.build().post().uri(profileServiceUrl + "/profile/doctor/add").bodyValue(userDTO).retrieve().bodyToMono(Long.class);
        }else if(userDTO.getRole().equals(Roles.Patient)){
            return webClient.build().post().uri(profileServiceUrl + "/profile/patient/add").bodyValue(userDTO).retrieve().bodyToMono(Long.class);
        }else if(userDTO.getRole().equals(Roles.Admin)){
            return webClient.build().post().uri(profileServiceUrl + "/profile/admin/add").bodyValue(userDTO).retrieve().bodyToMono(Long.class);
        }
        return null;
    }
}
