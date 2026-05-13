package com.example.produitsservice.repository;

import com.example.produitsservice.entity.Produit;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class ProduitRepositoryTest {

    @Autowired
    private ProduitRepository produitRepository;

    @Test
    void testSaveAndFind() {
        Produit produit = new Produit();
        produit.setNom("Integration Test Product");
        produit.setPrix(50.0);
        
        produitRepository.save(produit);

        List<Produit> found = produitRepository.findAll();
        assertThat(found).hasSize(1);
        assertThat(found.get(0).getNom()).isEqualTo("Integration Test Product");
    }
}
