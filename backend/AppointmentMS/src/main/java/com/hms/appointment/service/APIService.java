package com.hms.appointment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class APIService {
    @Autowired
    private WebClient.Builder webClient;
    
    @Value("${profile.service.url}")
    private String profileServiceUrl;
    
    @Value("${user.service.url}")
    private String userServiceUrl;

    public Mono<Boolean> isDoctorExists(Long id){
        return webClient.build().get().uri(profileServiceUrl + "/profile/doctor/exists/"+id).retrieve().bodyToMono(Boolean.class);
    }
    public Mono<Boolean> isPatientExists(Long id){
        return webClient.build().get().uri(profileServiceUrl + "/profile/patient/exists/"+id).retrieve().bodyToMono(Boolean.class);
    }
    public Mono<Boolean> isAdminExists(Long id){
        return webClient.build().get().uri(profileServiceUrl + "/profile/admin/exists/"+id).retrieve().bodyToMono(Boolean.class);
    }
    public Mono<Boolean> isUserExists(Long id){
        return webClient.build().get().uri(userServiceUrl + "/user/exists/"+id).retrieve().bodyToMono(Boolean.class);
    }
}
