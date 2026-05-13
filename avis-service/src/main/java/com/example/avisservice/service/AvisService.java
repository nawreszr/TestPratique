package com.example.avisservice.service;

import com.example.avisservice.client.ProduitClient;
import com.example.avisservice.entity.Avis;
import com.example.avisservice.repository.AvisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AvisService {

    private final AvisRepository avisRepository;
    private final ProduitClient produitClient;

    public List<Avis> getAvisByProduitId(Long produitId) {
        return avisRepository.findByProduitId(produitId);
    }

    public Avis saveAvis(Avis avis) {
        try {
            produitClient.getProduitById(avis.getProduitId());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Produit introuvable avec l'ID : " + avis.getProduitId());
        }
        return avisRepository.save(avis);
    }
}
