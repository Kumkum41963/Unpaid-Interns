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
      <View style={styles.details}>
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
<<<<<<< HEAD
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 15,
=======
    padding: 15,
    backgroundColor: "#1e1e1e", // Dark background for card
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#2e7d32", // Green border for eco-friendly touch
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
>>>>>>> 365f1f97f2a1b34a36af3372b1eb02f403b29e92
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
<<<<<<< HEAD
    color: "#333",
  },
  price: {
    fontSize: 14,
    color: "#1B5E20",
    marginVertical: 5,
  },
  buyButton: {
    backgroundColor: "#1B5E20",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-start",
=======
    marginTop: 10,
    color: "#ffffff", // White text for readability
  },
  price: {
    fontSize: 14,
    color: "#a0e080", // Green for eco-friendly contrast
    marginVertical: 8,
  },
  buyButton: {
    backgroundColor: "#388e3c", // Green background for buy button
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
>>>>>>> 365f1f97f2a1b34a36af3372b1eb02f403b29e92
  },
  buyText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Product;
