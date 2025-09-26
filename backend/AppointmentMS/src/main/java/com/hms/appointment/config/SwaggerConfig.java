package com.hms.appointment.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("DLS HMS - Appointment Microservice API")
                        .version("1.0")
                        .description("API documentation for the Appointment Microservice in DLS HMS")
                        .contact(new Contact()
                                .name("DLS HMS Team")
                                .email("support@dlshms.com")
                        )
                );
    }
}
