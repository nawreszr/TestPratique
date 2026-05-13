package com.example.produitsservice.repository;

import com.example.produitsservice.entity.Categorie;
import com.example.produitsservice.entity.Produit;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class ProduitRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private ProduitRepository produitRepository;

    @Test
    void testFindByCategorieId() {
        Categorie cat = new Categorie(null, "Electronics");
        cat = entityManager.persist(cat);

        Produit p1 = new Produit(null, "Laptop", 1200.0, 10, cat);
        Produit p2 = new Produit(null, "Phone", 800.0, 20, cat);
        entityManager.persist(p1);
        entityManager.persist(p2);
        entityManager.flush();

        List<Produit> found = produitRepository.findByCategorieId(cat.getId());

        assertThat(found).hasSize(2);
        assertThat(found).extracting(Produit::getNom).containsExactlyInAnyOrder("Laptop", "Phone");
    }

    @Test
    void testSaveAndFindById() {
        Produit p = new Produit(null, "Camera", 500.0, 5, null);
        Produit saved = produitRepository.save(p);

        Produit found = entityManager.find(Produit.class, saved.getId());
        assertThat(found.getNom()).isEqualTo("Camera");
    }
}
