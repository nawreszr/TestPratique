import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import axios from "axios";
import { IconSymbol } from '@/components/ui/icon-symbol';

interface Categorie {
  id: number;
  nom: string;
}

interface Produit {
  id: number;
  nom: string;
  prix: number;
  stock: number;
}

interface Avis {
  id: number;
  auteur: string;
  note: number;
  commentaire: string;
}

const API = "http://192.168.1.230:8090";

export default function App() {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [produits, setProduits] = useState<Produit[]>([]);
  const [avis, setAvis] = useState<Avis[]>([]);
  const [selectedProduit, setSelectedProduit] = useState<Produit | null>(null);
  const [activeTab, setActiveTab] = useState<number | null>(null);

  useEffect(() => {
    axios.get(`${API}/api/categories`)
      .then(res => {
        setCategories(res.data);
        if (res.data.length > 0) {
          loadProduits(res.data[0].id);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const loadProduits = (categorieId: number) => {
    setActiveTab(categorieId);
    setAvis([]);
    setSelectedProduit(null);
    axios.get(`${API}/api/produits?categorieId=${categorieId}`)
      .then(res => setProduits(res.data))
      .catch(err => console.log(err));
  };

  const loadAvis = (produit: Produit) => {
    setSelectedProduit(produit);
    axios.get(`${API}/api/avis/${produit.id}`)
      .then(res => setAvis(res.data))
      .catch(err => console.log(err));
  };

  return (
    <LinearGradient colors={['#000000', '#0a0a1a', '#1a0b2e']} style={styles.safeArea}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerSubtitle}>Nexus Store</Text>
            <Text style={styles.headerTitle}>Collections</Text>
          </View>

          {/* Categories Horizontal Scroll */}
          <View style={styles.categoryContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryList}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.categoryChip, activeTab === cat.id && styles.activeCategoryChip]}
                  onPress={() => loadProduits(cat.id)}
                >
                  <Text style={[styles.categoryText, activeTab === cat.id && styles.activeCategoryText]}>
                    {cat.nom}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Products List */}
          <FlatList
            data={produits}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.productList}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.productCard} onPress={() => loadAvis(item)} activeOpacity={0.7}>
                <LinearGradient 
                  colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                  style={styles.cardGradient}
                >
                  <View style={styles.productIconContainer}>
                    <IconSymbol name="cube.fill" size={24} color="#818cf8" />
                  </View>
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{item.nom}</Text>
                    <Text style={styles.productPrice}>{item.prix} DT</Text>
                  </View>
                  <View style={styles.stockInfo}>
                    <View style={[styles.stockDot, { backgroundColor: item.stock > 0 ? '#10b981' : '#ef4444' }]} />
                    <Text style={styles.stockText}>{item.stock} unités</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <IconSymbol name="tray.fill" size={64} color="rgba(255,255,255,0.1)" />
                <Text style={styles.emptyText}>Boutique en cours de réapprovisionnement...</Text>
              </View>
            }
          />

          {/* Reviews Modal */}
          {selectedProduit && (
            <View style={styles.reviewsSection}>
              <LinearGradient colors={['#1e1b4b', '#0f172a']} style={styles.modalGradient}>
                <View style={styles.reviewsHeader}>
                  <View>
                    <Text style={styles.reviewsTitle}>Feedback</Text>
                    <Text style={styles.reviewsSubtitle}>{selectedProduit.nom}</Text>
                  </View>
                  <TouchableOpacity onPress={() => setSelectedProduit(null)}>
                    <IconSymbol name="xmark" size={24} color="#94a3b8" />
                  </TouchableOpacity>
                </View>
                <ScrollView style={styles.reviewsList} showsVerticalScrollIndicator={false}>
                  {avis.length === 0 ? (
                    <Text style={styles.noReviews}>Aucune donnée disponible</Text>
                  ) : (
                    avis.map(a => (
                      <View key={a.id} style={styles.reviewCard}>
                        <View style={styles.reviewUser}>
                          <Text style={styles.reviewAuthor}>{a.auteur}</Text>
                          <View style={styles.stars}>
                            {[...Array(5)].map((_, i) => (
                              <IconSymbol
                                key={i}
                                name="star.fill"
                                size={10}
                                color={i < a.note ? "#f59e0b" : "#334155"}
                              />
                            ))}
                          </View>
                        </View>
                        <Text style={styles.reviewText}>{a.commentaire}</Text>
                      </View>
                    ))
                  )}
                </ScrollView>
              </LinearGradient>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerSubtitle: {
    color: "#818cf8",
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "900",
    letterSpacing: -1,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryList: {
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  activeCategoryChip: {
    backgroundColor: "#6366f1",
    borderColor: "#818cf8",
  },
  categoryText: {
    color: "#94a3b8",
    fontWeight: "700",
    fontSize: 14,
  },
  activeCategoryText: {
    color: "#fff",
  },
  productList: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  productCard: {
    marginBottom: 16,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  cardGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  productIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "rgba(99, 102, 241, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: "#f1f5f9",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 6,
  },
  productPrice: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    opacity: 0.8,
  },
  stockInfo: {
    alignItems: "flex-end",
  },
  stockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
  },
  stockText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "700",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  emptyText: {
    color: "#475569",
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  reviewsSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
  },
  modalGradient: {
    flex: 1,
    padding: 32,
  },
  reviewsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 32,
  },
  reviewsTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "900",
  },
  reviewsSubtitle: {
    color: "#818cf8",
    fontSize: 16,
    fontWeight: "600",
  },
  reviewsList: {
    flex: 1,
  },
  reviewCard: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  reviewUser: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  reviewAuthor: {
    color: "#f1f5f9",
    fontWeight: "800",
    fontSize: 15,
  },
  stars: {
    flexDirection: "row",
    gap: 3,
  },
  reviewText: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
  },
  noReviews: {
    color: "#475569",
    textAlign: "center",
    marginTop: 60,
    fontSize: 16,
  },
});
