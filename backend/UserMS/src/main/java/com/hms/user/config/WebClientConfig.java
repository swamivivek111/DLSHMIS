package com.hms.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

/*There are 2 ways of microservices communication 
 * 1. Rest-Template
 * 2. Web Client - We are using Web Client
*/
@Configuration
public class WebClientConfig {
    @Bean
    public WebClient.Builder getWebClientBuilder(){
        return WebClient.builder().defaultHeader("X-Secret-Key", "SECRET").filter(logRequest());//whereever you access this default value get set
    }

    private ExchangeFilterFunction logRequest(){
        return ExchangeFilterFunction.ofRequestProcessor(clientRequest->{
            System.out.println("Request: "+clientRequest.method()+"URL : "+clientRequest.url());
            return Mono.just(clientRequest);
        });
    }
}
