package com.example.produitsservice.service;

import com.example.produitsservice.entity.Produit;
import com.example.produitsservice.repository.ProduitRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProduitServiceTest {

    @Mock
    private ProduitRepository produitRepository;

    @InjectMocks
    private ProduitService produitService;

    private Produit produit;

    @BeforeEach
    void setUp() {
        produit = new Produit();
        produit.setId(1L);
        produit.setNom("Produit Test");
        produit.setPrix(100.0);
    }

    @Test
    void testGetProduitById() {
        when(produitRepository.findById(1L)).thenReturn(Optional.of(produit));

        Produit found = produitService.getProduitById(1L);

        assertThat(found).isNotNull();
        assertThat(found.getNom()).isEqualTo("Produit Test");
        verify(produitRepository, times(1)).findById(1L);
    }

    @Test
    void testSaveProduit() {
        when(produitRepository.save(produit)).thenReturn(produit);

        Produit saved = produitService.saveProduit(produit);

        assertThat(saved).isNotNull();
        assertThat(saved.getId()).isEqualTo(1L);
        verify(produitRepository, times(1)).save(produit);
    }
}
