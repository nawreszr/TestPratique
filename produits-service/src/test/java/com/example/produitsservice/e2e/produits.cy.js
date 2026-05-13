describe('E2E Produits via API Gateway', () => {
    const gatewayUrl = 'http://localhost:8090';

    it('liste les catégories', () => {
        cy.request(`${gatewayUrl}/api/categories`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.length).to.be.greaterThan(0);
        });
    });

    it('liste les produits', () => {
        cy.request(`${gatewayUrl}/api/produits`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.length).to.be.greaterThan(0);
        });
    });

    it('affiche les produits par catégorie', () => {
        cy.request(`${gatewayUrl}/api/produits?categorieId=1`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    it('affiche le détail d’un produit', () => {
        cy.request(`${gatewayUrl}/api/produits/1`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('nom');
            expect(response.body).to.have.property('prix');
        });
    });

    it('affiche les avis d’un produit', () => {
        cy.request(`${gatewayUrl}/api/avis/1`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });
});