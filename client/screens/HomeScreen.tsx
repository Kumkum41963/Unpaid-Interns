import React, { useEffect, useState, useRef } from "react";
import {
  View, Text, ImageBackground, StyleSheet, ScrollView, ActivityIndicator, Animated
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "@/navigation/types";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import axios from "axios";

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Animations for smooth UI
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          setLoading(false);
          return;
        }
<<<<<<< HEAD

        // Fetch user profile from backend
        const response = await axios.get("https://backend-amber-nine-53.vercel.app/api/user/profile", {
=======
        const response = await axios.get("http://localhost:3000/user/profile", {
>>>>>>> 365f1f97f2a1b34a36af3372b1eb02f403b29e92
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

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 70,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2lyY2xlJTIwc3VzdGFpbmFibGV8ZW58MHx8MHx8fDA%3D" }}
      style={styles.background}
    >
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.container}>
        <Animated.Text style={[styles.appTitle, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          UrjaSetu
        </Animated.Text>

        <Animated.Text
          style={[styles.description, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
        >
          Smarter Energy, Greener Future{"\n\n"}

          ⚡ Reduce waste, maximize savings.{"\n"}
          ☀️ Calculate solar potential.{"\n"}
          🔋 Optimize energy use.{"\n"}
          🏪 Find efficient solutions—all in one place.{"\n\n"}

          Take control. Save more. Live smarter.
        </Animated.Text>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay to improve readability
  },
  container: {
    flexGrow: 1,
    padding: 10,
    paddingTop: 40, // Optional: Adds extra space from the top
    alignItems: "center",
    justifyContent: "flex-start", // Aligns content towards the top
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  appTitle: {
    fontSize: 80, // Bigger impact
    fontWeight: "bold",
    textAlign: "center",
    color: "#74b420", // Lighter text for dark theme
    marginBottom: 15, // Shifting a bit
    marginTop: 40, // Moving it higher on the screen
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 12,
    letterSpacing: 2,
    fontFamily: "Poppins", // Example of a modern font
  },
  description: {
    fontSize: 20, // Increased readability
    color: "hsl(116.00000000000001, 31.914893617021285%, 90.7843137254902%)",
    textAlign: "center",
    lineHeight: 30,
    letterSpacing: 0.8,
    paddingHorizontal: 20,
    fontFamily: "Roboto", // Modern sans-serif font
    marginTop: 20, // Adds space from the title
  },
});
