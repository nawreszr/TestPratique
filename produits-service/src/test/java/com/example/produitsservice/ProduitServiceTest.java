package com.example.produitsservice;

import com.example.produitsservice.entity.Produit;
import com.example.produitsservice.repository.ProduitRepository;
import com.example.produitsservice.service.ProduitService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProduitServiceTest {

    @Mock
    private ProduitRepository produitRepository;

    @InjectMocks
    private ProduitService produitService;

    @Test
    void shouldReturnAllProduits() {
        Produit p1 = new Produit();
        p1.setId(1L);
        p1.setNom("Laptop HP");

        Produit p2 = new Produit();
        p2.setId(2L);
        p2.setNom("iPhone 15");

        when(produitRepository.findAll()).thenReturn(List.of(p1, p2));

        List<Produit> result = produitService.findAll(null);

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getNom()).isEqualTo("Laptop HP");

        verify(produitRepository, times(1)).findAll();
    }

    @Test
    void shouldReturnProduitsByCategorieId() {
        Produit p1 = new Produit();
        p1.setId(1L);
        p1.setNom("Laptop HP");

        when(produitRepository.findByCategorieId(1L)).thenReturn(List.of(p1));

        List<Produit> result = produitService.findAll(1L);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getNom()).isEqualTo("Laptop HP");

        verify(produitRepository, times(1)).findByCategorieId(1L);
    }

    @Test
    void shouldReturnProduitById() {
        Produit p1 = new Produit();
        p1.setId(1L);
        p1.setNom("Laptop HP");

        when(produitRepository.findById(1L)).thenReturn(Optional.of(p1));

        Produit result = produitService.findById(1L);

        assertThat(result).isNotNull();
        assertThat(result.getNom()).isEqualTo("Laptop HP");

        verify(produitRepository, times(1)).findById(1L);
    }

    @Test
    void shouldSaveProduit() {
        Produit p1 = new Produit();
        p1.setNom("Clavier Logitech");
        p1.setPrix(80.0);
        p1.setStock(30);

        when(produitRepository.save(p1)).thenReturn(p1);

        Produit result = produitService.save(p1);

        assertThat(result).isNotNull();
        assertThat(result.getNom()).isEqualTo("Clavier Logitech");

        verify(produitRepository, times(1)).save(p1);
    }
}