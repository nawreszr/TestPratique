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

    @Cacheable(value = "produits", key = "#categorieId ?: 'all'")
    public List<Produit> findAll(Long categorieId) {
        if (categorieId != null) {
            return produitRepository.findByCategorieId(categorieId);
        }
        return produitRepository.findAll();
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
