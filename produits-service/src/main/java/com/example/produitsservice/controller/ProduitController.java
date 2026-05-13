package com.example.produitsservice.controller;

import com.example.produitsservice.entity.Produit;
import com.example.produitsservice.service.ProduitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produits")
@RequiredArgsConstructor
@Tag(name = "Produit", description = "API de gestion des produits")
public class ProduitController {

    private final ProduitService produitService;

    @GetMapping
    @Operation(summary = "Liste tous les produits ou les produits d'une catégorie")
    public List<Produit> getProduits(@RequestParam(required = false) Long categorieId) {
        if (categorieId != null) {
            return produitService.findByCategorie(categorieId);
        }
        return produitService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Détail d'un produit")
    public Produit getProduit(@PathVariable Long id) {
        return produitService.findById(id);
    }

    @PostMapping
    @Operation(summary = "Crée un produit")
    public Produit createProduit(@RequestBody Produit produit) {
        return produitService.save(produit);
    }
}