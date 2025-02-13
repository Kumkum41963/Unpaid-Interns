import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

type ProductProps = {
  item: { id: string; name: string; price: number; image: string };
  onBuy: (id: string, price: number) => void;
};

const Product: React.FC<ProductProps> = ({ item, onBuy }) => {
  return (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.price}>{item.price} Green Points</Text>
      <TouchableOpacity style={styles.buyButton} onPress={() => onBuy(item.id, item.price)}>
        <Text style={styles.buyText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: { padding: 10, backgroundColor: "#fff", borderRadius: 8, marginBottom: 10 },
  image: { width: "100%", height: 150, borderRadius: 8 },
  productName: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  price: { fontSize: 14, color: "green", marginVertical: 5 },
  buyButton: { backgroundColor: "blue", padding: 10, borderRadius: 5, alignItems: "center" },
  buyText: { color: "white", fontSize: 14, fontWeight: "bold" },
});

export default Product;