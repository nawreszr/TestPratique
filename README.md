# Projet E-Commerce Microservices & Mobile

Ce projet est une application de commerce électronique basée sur une architecture microservices avec Spring Cloud et une application mobile React Native (Expo).

## Architecture du Projet

- **eureka-server** : Annuaire des services (Service Discovery).
- **api-gateway** : Point d'entrée unique pour les microservices (Port 8090).
- **produits-service** : Gestion des produits et catégories (Port 8091).
- **avis-service** : Gestion des avis produits.
- **mobile-app** : Application mobile client (Expo).

---

## 🚀 Lancement du Projet

### 1. Prérequis
- JDK 25
- Node.js & npm
- Docker & Docker Compose (optionnel mais recommandé)
- PostgreSQL & Redis (pour le service produits)

### 2. Démarrage des Microservices (Backend)
Il est crucial de démarrer les services dans cet ordre :

1. **Eureka Server** :
   ```bash
   cd eureka-server
   ./mvnw spring-boot:run
   ```
2. **API Gateway** :
   ```bash
   cd api-gateway
   ./mvnw spring-boot:run
   ```
3. **Produits Service** & **Avis Service** :
   ```bash
   cd produits-service
   ./mvnw spring-boot:run
   
   cd ../avis-service
   ./mvnw spring-boot:run
   ```

### 3. Démarrage de l'Application Mobile
```bash
cd mobile-app
npm install --legacy-peer-deps
npm start
```

---

## 🧪 Exécution des Tests

### 1. Tests Unitaires et d'Intégration (Produits Service)
Nous utilisons JUnit 5, Mockito et H2 pour les tests du backend.

Pour lancer les tests du service produits :
```bash
cd produits-service
./mvnw test
```
- **Tests Unitaires** : `ProduitServiceTest` (Mockito)
- **Tests d'Intégration** : `ProduitRepositoryTest` (@DataJpaTest + H2)

---

## 🛠 Technologies Utilisées
- **Backend** : Spring Boot 3, Spring Cloud (Eureka, Gateway), Spring Data JPA, Redis, PostgreSQL.
- **Frontend** : React Native, Expo, Expo Router.
- **Tests** : JUnit 5, Mockito, AssertJ, H2 Database.
