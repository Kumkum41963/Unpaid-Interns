import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Button, Alert, ActivityIndicator } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "@/navigation/types";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          setLoading(false);
          return;
        }

        // Fetch user profile from backend
        const response = await axios.get("https://backend-amber-nine-53.vercel.app/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
          <Image
            source={{ uri: userData?.avatar || "https://via.placeholder.com/100" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.greeting}>
          {userData ? `Hello, ${userData.name}!` : "Welcome to GreenEnergy!"}
        </Text>
      </View>

      {/* Login & Register Buttons (Only if not logged in) */}
      {!userData && (
        <View style={styles.authButtons}>
          <Button title="Login" onPress={() => navigation.navigate("Login")} />
          <Button title="Register" onPress={() => navigation.navigate("SignUp")} />
        </View>
      )}

      {/* About Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>About This App</Text>
        <Text style={styles.cardDescription}>
          GreenEnergy helps you calculate your **solar energy potential**, **electricity consumption**, 
          and **carbon footprint** for a sustainable future.
        </Text>
        <Button title="Learn More" onPress={() => navigation.navigate("About")} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  authButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  card: {
    width: "90%",
    padding: 15,
    backgroundColor: "#f8f8f8",
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },
});

