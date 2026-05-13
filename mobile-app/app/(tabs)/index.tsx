import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

const API = "http://localhost:8090"; 

export default function App() {
  const [categories, setCategories] = useState([]);
  const [produits, setProduits] = useState([]);
  const [avis, setAvis] = useState([]);
  const [selectedProduit, setSelectedProduit] = useState(null);

  useEffect(() => {
    axios.get(`${API}/api/categories`)
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  const loadProduits = (categorieId) => {
    setAvis([]);
    setSelectedProduit(null);

    axios.get(`${API}/api/produits?categorieId=${categorieId}`)
      .then(res => setProduits(res.data))
      .catch(err => console.log(err));
  };

  const loadAvis = (produit) => {
    setSelectedProduit(produit);

    axios.get(`${API}/api/avis/${produit.id}`)
      .then(res => setAvis(res.data))
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mini Boutique</Text>

      <Text style={styles.section}>Catégories</Text>

      {categories.map(cat => (
        <Button
          key={cat.id}
          title={cat.nom}
          onPress={() => loadProduits(cat.id)}
        />
      ))}

      <Text style={styles.section}>Produits</Text>

      <FlatList
        data={produits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => loadAvis(item)}>
            <Text style={styles.name}>{item.nom}</Text>
            <Text>Prix: {item.prix} DT</Text>
            <Text>Stock: {item.stock}</Text>
          </TouchableOpacity>
        )}
      />

      {selectedProduit && (
        <>
          <Text style={styles.section}>Avis de {selectedProduit.nom}</Text>

          {avis.length === 0 ? (
            <Text>Aucun avis</Text>
          ) : (
            avis.map(a => (
              <View key={a.id} style={styles.review}>
                <Text>{a.auteur}</Text>
                <Text>Note: {a.note}/5</Text>
                <Text>{a.commentaire}</Text>
              </View>
            ))
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 30,
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    padding: 12,
    backgroundColor: "#eee",
    marginBottom: 10,
    borderRadius: 8,
  },
  review: {
    padding: 10,
    backgroundColor: "#ddd",
    marginBottom: 8,
    borderRadius: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
});