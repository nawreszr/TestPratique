package com.example.produitsservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class ProduitsServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProduitsServiceApplication.class, args);
    }

}
