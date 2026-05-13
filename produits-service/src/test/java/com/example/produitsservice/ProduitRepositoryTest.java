package com.example.produitsservice;

import com.example.produitsservice.entity.Categorie;
import com.example.produitsservice.entity.Produit;
import com.example.produitsservice.repository.CategorieRepository;
import com.example.produitsservice.repository.ProduitRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.ImportAutoConfiguration;
import org.springframework.boot.cache.autoconfigure.CacheAutoConfiguration;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@ImportAutoConfiguration(exclude = CacheAutoConfiguration.class)
class ProduitRepositoryTest {

    @Autowired
    private ProduitRepository produitRepository;

    @Autowired
    private CategorieRepository categorieRepository;

    @Test
    @DisplayName("Should find produits by categorie id")
    void shouldFindProduitsByCategorieId() {
        Categorie categorie = new Categorie();
        categorie.setNom("Informatique");
        categorie = categorieRepository.save(categorie);

        Produit produit = new Produit();
        produit.setNom("Laptop HP");
        produit.setPrix(2500.0);
        produit.setStock(10);
        produit.setCategorie(categorie);

        produitRepository.save(produit);

        List<Produit> result = produitRepository.findByCategorieId(categorie.getId());

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getNom()).isEqualTo("Laptop HP");
        assertThat(result.get(0).getCategorie().getNom()).isEqualTo("Informatique");
    }

    @Test
    @DisplayName("Should save produit")
    void shouldSaveProduit() {
        Categorie categorie = new Categorie();
        categorie.setNom("Accessoires");
        categorie = categorieRepository.save(categorie);

        Produit produit = new Produit();
        produit.setNom("Souris Gaming");
        produit.setPrix(60.0);
        produit.setStock(20);
        produit.setCategorie(categorie);

        Produit saved = produitRepository.save(produit);

        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getNom()).isEqualTo("Souris Gaming");
    }
}