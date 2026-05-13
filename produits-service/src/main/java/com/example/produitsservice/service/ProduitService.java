package com.example.produitsservice.service;

import com.example.produitsservice.entity.Produit;
import com.example.produitsservice.repository.ProduitRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProduitService {

    private final ProduitRepository produitRepository;

    @Cacheable(value = "produits", key = "'all'")
    public List<Produit> findAll() {
        return produitRepository.findAll();
    }

    @Cacheable(value = "produits", key = "#categorieId")
    public List<Produit> findByCategorie(Long categorieId) {
        return produitRepository.findByCategorieId(categorieId);
    }

    public Produit findById(Long id) {
        return produitRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produit introuvable"));
    }

    @CacheEvict(value = "produits", allEntries = true)
    public Produit save(Produit produit) {
        return produitRepository.save(produit);
    }
}
