import Product from "@/components/ui/Product";
import { useUserDetails } from "@/hooks/useUser";
import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const staticProducts = [
  { id: "1", name: "Solar Panel", price: 100, image: "https://via.placeholder.com/150" },
  { id: "2", name: "Reusable Water Bottle", price: 50, image: "https://via.placeholder.com/150" },
  { id: "3", name: "Eco-friendly Bag", price: 30, image: "https://via.placeholder.com/150" },
];

const Marketplace: React.FC = () => {
  const user = useUserDetails();
  const [greenPoints, setGreenPoints] = useState(user?.green_points ?? 0);

  const handleBuy = async (id: string, price: number) => {
    const token = await AsyncStorage.getItem("token");
    const email = await AsyncStorage.getItem("userEmail");

    if (!token || !email) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/user/deduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, price }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Purchase failed");

      setGreenPoints(data.green_points);
      Alert.alert("Success", `You bought ${id} for ${price} Green Points`);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to process purchase");
    }
  };

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Eco Marketplace</Text>
      <Text style={styles.description}>Use your Green Points to shop for sustainable products.</Text>

      <Text style={styles.points}>Green Points: {greenPoints}</Text>

      <FlatList
        data={staticProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Product item={item} onBuy={handleBuy} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40, // Ensures content starts at the top
    backgroundColor: "#121212", // Dark theme
  },
  heading: {
    fontSize: 30, // Bigger heading for emphasis
    fontWeight: "bold",
    color: "#a0e080", // Green for eco-friendly look
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#bbbbbb",
    textAlign: "center",
    marginBottom: 20,
  },
  points: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Marketplace;
