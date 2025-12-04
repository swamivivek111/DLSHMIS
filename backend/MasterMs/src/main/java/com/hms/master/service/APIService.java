package com.hms.master.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;


import reactor.core.publisher.Mono;

@Service
public class APIService {//To call from other MS
    @Autowired
    private WebClient.Builder webClient;

    public Mono<Boolean> isDoctorExists(Long id){
        return webClient.build().get().uri("http://localhost:8082/profile/doctor/exists/"+id).retrieve().bodyToMono(Boolean.class);
    }
    public Mono<Boolean> isPatientExists(Long id){
        return webClient.build().get().uri("http://localhost:8082/profile/patient/exists/"+id).retrieve().bodyToMono(Boolean.class);
    }
    public Mono<Boolean> isAdminExists(Long id){
        return webClient.build().get().uri("http://localhost:8082/profile/admin/exists/"+id).retrieve().bodyToMono(Boolean.class);
    }
    public Mono<Boolean> isUserExists(Long id){
        return webClient.build().get().uri("http://localhost:8081/user/exists/"+id).retrieve().bodyToMono(Boolean.class);
    }
    
    // Doctor-related methods moved to ProfileMs
}
