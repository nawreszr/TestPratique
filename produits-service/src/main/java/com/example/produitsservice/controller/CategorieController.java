package com.example.produitsservice.controller;

import com.example.produitsservice.entity.Categorie;
import com.example.produitsservice.repository.CategorieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategorieController {

    private final CategorieRepository categorieRepository;

    @GetMapping
    public List<Categorie> getCategories() {
        return categorieRepository.findAll();
    }

    @GetMapping("/{id}")
    public Categorie getCategorie(@PathVariable Long id) {
        return categorieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Catégorie introuvable"));
    }
}
