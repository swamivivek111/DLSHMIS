package com.hms.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {//This is for spring security
    
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception{
        return builder.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity)throws Exception{ // All requests comes here OR goes through security filter chain for authorization and authentications
        /*httpSecurity.authorizeRequests((requests)->requests.requestMatchers("/**").permitAll().anyRequest().authenticated());
        httpSecurity.csrf().disable();//csrf >> Cross Origin Resource
        return httpSecurity.build();*/

        httpSecurity.csrf().disable().authorizeHttpRequests(auth->auth.requestMatchers(request->"SECRET".equals(request.getHeader("X-Secret-Key"))).permitAll().anyRequest().denyAll());
        return httpSecurity.build();
    }        
}
