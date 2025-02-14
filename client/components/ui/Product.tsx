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
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
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
  },
  buyText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Product;