package com.or.pjevaci;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class PjevaciApplication {


	public static void main(String[] args) {
		SpringApplication.run(PjevaciApplication.class, args);
	}

}

