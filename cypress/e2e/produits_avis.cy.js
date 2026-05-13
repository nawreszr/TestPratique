describe('Parcours Produit -> Détail -> Avis via API Gateway', () => {
  let produitId;

  it('1. Liste des produits', () => {
    cy.request('/api/produits')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        if (response.body.length > 0) {
          produitId = response.body[0].id;
        }
      });
  });

  it('2. Détail du produit', () => {
    if (!produitId) {
      cy.log('Aucun produit trouvé, test ignoré');
      return;
    }
    cy.request(`/api/produits/${produitId}`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', produitId);
        expect(response.body).to.have.property('nom');
      });
  });

  it('3. Liste des avis du produit', () => {
    if (!produitId) {
      cy.log('Aucun produit trouvé, test ignoré');
      return;
    }
    cy.request(`/api/avis/${produitId}`)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
  });
});
