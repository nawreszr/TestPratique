package com.example.avisservice.controller;

import com.example.avisservice.entity.Avis;
import com.example.avisservice.service.AvisService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avis")
@RequiredArgsConstructor
@Tag(name = "Avis Controller", description = "Gestion des avis produits")
public class AvisController {

    private final AvisService avisService;

    @GetMapping("/{produitId}")
    @Operation(summary = "Liste les avis d'un produit")
    public List<Avis> getAvisByProduit(@PathVariable Long produitId) {
        return avisService.getAvisByProduitId(produitId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Soumet un avis")
    public Avis createAvis(@RequestBody Avis avis) {
        return avisService.saveAvis(avis);
    }
}
