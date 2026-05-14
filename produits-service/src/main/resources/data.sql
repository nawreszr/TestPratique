-- Catégories High-Tech
INSERT INTO categorie (id, nom) VALUES (1, 'Computers');
INSERT INTO categorie (id, nom) VALUES (2, 'Smartphones');
INSERT INTO categorie (id, nom) VALUES (3, 'Gaming');
INSERT INTO categorie (id, nom) VALUES (4, 'Audio');

-- Produits Premium
INSERT INTO produit (id, nom, prix, stock, categorie_id) VALUES (1, 'MacBook Pro M3', 7500, 5, 1);
INSERT INTO produit (id, nom, prix, stock, categorie_id) VALUES (2, 'Razer Blade 16', 8200, 3, 1);
INSERT INTO produit (id, nom, prix, stock, categorie_id) VALUES (3, 'iPhone 15 Pro Max', 4800, 12, 2);
INSERT INTO produit (id, nom, prix, stock, categorie_id) VALUES (4, 'Samsung S24 Ultra', 4500, 10, 2);
INSERT INTO produit (id, nom, prix, stock, categorie_id) VALUES (5, 'PS5 Slim Edition', 1800, 15, 3);
INSERT INTO produit (id, nom, prix, stock, categorie_id) VALUES (6, 'RTX 4090 OC', 6200, 2, 3);
INSERT INTO produit (id, nom, prix, stock, categorie_id) VALUES (7, 'AirPods Max', 2100, 8, 4);
INSERT INTO produit (id, nom, prix, stock, categorie_id) VALUES (8, 'Sony WH-1000XM5', 1200, 20, 4);