package com.hms.user.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("*")); // Allow all origins
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of(
            "Authorization",
            "Content-Type",
            "Accept",
            "X-Requested-With",
            "X-Secret-Key",
            "Origin"
        ));
        config.setExposedHeaders(List.of("Authorization", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity)throws Exception{ // All requests comes here OR goes through security filter chain for authorization and authentications
        /*httpSecurity.authorizeRequests((requests)->requests.requestMatchers("/**").permitAll().anyRequest().authenticated());
        httpSecurity.csrf().disable();//csrf >> Cross Origin Resource
        return httpSecurity.build();*/

        //httpSecurity.csrf().disable().authorizeHttpRequests(auth->auth.requestMatchers(request->"SECRET".equals(request.getHeader("X-Secret-Key"))).permitAll().anyRequest().denyAll());
        //return httpSecurity.build();
        httpSecurity
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                // Allow preflight requests
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Allow Swagger endpoints without auth
                .requestMatchers(
                    "/swagger-ui/**",
                    "/v3/api-docs/**",
                    "/swagger-resources/**",
                    "/webjars/**"
                ).permitAll()

                // Custom header bypass (if needed)
                .requestMatchers(request -> "SECRET".equals(request.getHeader("X-Secret-Key"))).permitAll()

                // Everything else (change to .authenticated() if you want to secure)
                .anyRequest().permitAll()
            )
            .httpBasic();
        return httpSecurity.build();
    }        
}
