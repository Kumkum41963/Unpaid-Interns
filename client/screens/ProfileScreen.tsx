import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/types"; // Import navigation types

const screenWidth = Dimensions.get("window").width;

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Fix TypeScript error for navigation
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          Alert.alert("Session Expired", "Please log in again.");
          navigation.navigate("Login"); // Navigate to login when session expired
          return;
        }
        const response = await axios.get("https://backend-amber-nine-53.vercel.app/api/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Error", "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={{ uri: userData?.user?.avatar || "https://via.placeholder.com/100" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{userData?.user?.name}</Text>
        <Text style={styles.email}>{userData?.user?.email}</Text>
        <Text style={styles.greenPoints}>Green Points: {userData?.user?.green_points}</Text>
      </View>

      {/* Solar History Chart */}
      <Text style={styles.sectionTitle}>Solar Energy Output (Last 2 Entries)</Text>
      <LineChart
        data={{
          labels: userData?.history?.solarHistory?.slice(-2).map((s: any) => s.state) || [],
          datasets: [{ data: userData?.history?.solarHistory?.slice(-2).map((s: any) => s.monthly_solar_output_kWh) || [] }],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix=" kWh"
        chartConfig={chartConfig}
        style={styles.chart}
      />

      {/* Electricity Usage Chart */}
      <Text style={styles.sectionTitle}>Electricity Usage (Last 2 Entries)</Text>
      <LineChart
        data={{
          labels: userData?.history?.electricityUsage?.slice(-2).map((e: any) => e.state) || [],
          datasets: [{ data: userData?.history?.electricityUsage?.slice(-2).map((e: any) => e.monthly_usage_kWh) || [] }],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix=" kWh"
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#f0f0f0",
  backgroundGradientTo: "#e0e0e0",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" },
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#fff", alignItems: "center" },
  profileCard: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "bold" },
  email: { fontSize: 16, color: "gray" },
  greenPoints: { fontSize: 16, fontWeight: "bold", color: "green" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  chart: { marginVertical: 10, borderRadius: 16 },
});
