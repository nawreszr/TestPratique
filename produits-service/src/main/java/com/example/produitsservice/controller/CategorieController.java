package com.example.produitsservice.controller;

import com.example.produitsservice.entity.Categorie;
import com.example.produitsservice.service.CategorieService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Tag(name = "Catégorie", description = "API de gestion des catégories")
public class CategorieController {

    private final CategorieService categorieService;

    @GetMapping
    @Operation(summary = "Liste toutes les catégories")
    public List<Categorie> getCategories() {
        return categorieService.findAll();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Détail d'une catégorie")
    public Categorie getCategorie(@PathVariable Long id) {
        return categorieService.findById(id);
    }
    
    @PostMapping
    @Operation(summary = "Crée une catégorie")
    public Categorie createCategorie(@RequestBody Categorie categorie) {
        return categorieService.save(categorie);
    }
}