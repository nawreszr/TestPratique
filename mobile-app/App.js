import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';

const GATEWAY_URL = 'http://10.0.2.2:8090'; 

export default function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${GATEWAY_URL}/api/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Erreur catégories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async (catId) => {
    setLoading(true);
    setSelectedCategory(catId);
    setSelectedProduct(null);
    setReviews([]);
    try {
      const response = await fetch(`${GATEWAY_URL}/api/produits?categorieId=${catId}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erreur produits:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (product) => {
    setLoading(true);
    setSelectedProduct(product);
    try {
      const response = await fetch(`${GATEWAY_URL}/api/avis/${product.id}`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Erreur avis:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>🛒 Shop-Test Pratique</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Catégories</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[styles.categoryCard, selectedCategory === item.id && styles.selectedCard]}
              onPress={() => fetchProducts(item.id)}
            >
              <Text style={[styles.categoryName, selectedCategory === item.id && {color: '#FFF'}]}>{item.nom}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.productSection}>
        <Text style={styles.sectionTitle}>Produits {loading && <ActivityIndicator size="small" color="#007AFF" />}</Text>
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.emptyText}>Sélectionnez une catégorie</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.productCard} onPress={() => fetchReviews(item)}>
              <View>
                <Text style={styles.productName}>{item.nom}</Text>
                <Text style={styles.productPrice}>{item.prix} €</Text>
              </View>
              <Text style={styles.arrow}>❯</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {selectedProduct && (
        <View style={styles.reviewSection}>
          <Text style={styles.sectionTitle}>Avis pour {selectedProduct.nom}</Text>
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<Text style={styles.emptyText}>Aucun avis pour ce produit</Text>}
            renderItem={({ item }) => (
              <View style={styles.reviewCard}>
                <Text style={styles.reviewAuthor}>{item.auteur} - ⭐ {item.note}/5</Text>
                <Text style={styles.reviewComment}>{item.commentaire}</Text>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 20, paddingTop: 50, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#EEE' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' },
  section: { padding: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10, color: '#333' },
  categoryCard: { paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#FFF', borderRadius: 20, marginRight: 10, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1 },
  selectedCard: { backgroundColor: '#007AFF' },
  categoryName: { fontWeight: '600', color: '#333' },
  productSection: { flex: 1, padding: 15 },
  productCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 10, elevation: 2 },
  productName: { fontSize: 16, fontWeight: '600' },
  productPrice: { color: '#007AFF', fontWeight: 'bold', marginTop: 4 },
  reviewSection: { flex: 1, backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, elevation: 10 },
  reviewCard: { borderBottomWidth: 1, borderBottomColor: '#EEE', paddingVertical: 10 },
  reviewAuthor: { fontWeight: 'bold', color: '#444' },
  reviewComment: { color: '#666', marginTop: 4 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 20 },
  arrow: { color: '#CCC', fontSize: 18 }
});
