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
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.price}>{item.price} Green Points</Text>
        <TouchableOpacity style={styles.buyButton} onPress={() => onBuy(item.id, item.price)}>
          <Text style={styles.buyText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#2e7d32",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  productDetails: {
    paddingVertical: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: "#a0e080",
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buyText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Product;