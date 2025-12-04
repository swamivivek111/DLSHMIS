package com.hms.master;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.hms.master")
public class MasterMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MasterMsApplication.class, args);
	}

}
