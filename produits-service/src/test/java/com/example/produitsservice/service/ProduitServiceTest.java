package com.example.produitsservice.service;

import com.example.produitsservice.entity.Produit;
import com.example.produitsservice.repository.ProduitRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProduitServiceTest {

    @Mock
    private ProduitRepository produitRepository;

    @InjectMocks
    private ProduitService produitService;

    @Test
    void testFindAll_WithCategorieId() {
        Long catId = 1L;
        Produit p = new Produit(1L, "Test Product", 100.0, 10, null);
        when(produitRepository.findByCategorieId(catId)).thenReturn(Arrays.asList(p));

        List<Produit> results = produitService.findAll(catId);

        assertThat(results).hasSize(1);
        assertThat(results.get(0).getNom()).isEqualTo("Test Product");
        verify(produitRepository, times(1)).findByCategorieId(catId);
    }

    @Test
    void testFindAll_WithoutCategorieId() {
        Produit p = new Produit(1L, "Test Product", 100.0, 10, null);
        when(produitRepository.findAll()).thenReturn(Arrays.asList(p));

        List<Produit> results = produitService.findAll(null);

        assertThat(results).hasSize(1);
        verify(produitRepository, times(1)).findAll();
    }

    @Test
    void testFindById_Success() {
        Produit p = new Produit(1L, "Test Product", 100.0, 10, null);
        when(produitRepository.findById(1L)).thenReturn(Optional.of(p));

        Produit result = produitService.findById(1L);

        assertThat(result.getNom()).isEqualTo("Test Product");
    }

    @Test
    void testFindById_NotFound() {
        when(produitRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> produitService.findById(1L));
    }

    @Test
    void testSave() {
        Produit p = new Produit(null, "New Product", 50.0, 5, null);
        Produit saved = new Produit(1L, "New Product", 50.0, 5, null);
        when(produitRepository.save(any(Produit.class))).thenReturn(saved);

        Produit result = produitService.save(p);

        assertThat(result.getId()).isEqualTo(1L);
        verify(produitRepository, times(1)).save(p);
    }
}
