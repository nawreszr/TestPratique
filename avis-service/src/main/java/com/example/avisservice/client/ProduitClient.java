package com.example.avisservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "produit-service", url = "${application.config.produit-service-url:http://produit-service:8081}")
public interface ProduitClient {
    
    @GetMapping("/api/produits/{id}")
    Object getProduitById(@PathVariable("id") Long id);
}
