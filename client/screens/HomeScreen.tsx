import React, { useRef, useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Animated,
  Text
} from "react-native";

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

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
      source={{
        uri: "https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
      }}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <ScrollView contentContainerStyle={styles.container}>
        <Animated.Text
          style={[
            styles.appTitle,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
        >
          Welcome to UrjaSetu
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
          ]}
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    flexGrow: 1,
    padding: 10,
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  appTitle: {
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "#74b420",
    marginBottom: 15,
    marginTop: 40,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 12,
    letterSpacing: 2,
    fontFamily: "Poppins",
  },
  description: {
    fontSize: 20,
    color: "hsl(116, 32%, 91%)",
    textAlign: "center",
    lineHeight: 30,
    letterSpacing: 0.8,
    paddingHorizontal: 20,
    fontFamily: "Roboto",
    marginTop: 20,
  },
});