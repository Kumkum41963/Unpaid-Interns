import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/types";
import { useUserDetails } from "@/hooks/useUser";

const screenWidth = Dimensions.get("window").width;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userData = useUserDetails();
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (userData !== null) {
      setLoading(false);
    }
  }, [userData]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  const avatarSource = userData?.avatar
    ? { uri: userData.avatar }
    : require("../assets/images/avatar.png");

  const history = userData?.history || {
    solarHistory: [
      { state: "Jan", monthly_solar_output_kWh: 0 },
      { state: "Feb", monthly_solar_output_kWh: 0 }
    ],
    electricityUsage: [
      { state: "Jan", monthly_usage_kWh: 0 },
      { state: "Feb", monthly_usage_kWh: 0 }
    ]
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Animated.View style={{ opacity: fadeAnim, width: "100%" }}>
        <View style={styles.profileCard}>
          <Image source={avatarSource} style={styles.avatar} />
          <Text style={styles.name}>{userData?.name}</Text>
          <Text style={styles.greenPoints}>Green Points: {userData?.green_points}</Text>
        </View>
        <Text style={styles.sectionTitle}>Solar Energy Output (Last 2 Entries)</Text>
        <LineChart
          data={{
            labels: history.solarHistory.map((s: any) => s.state),
            datasets: [{ data: history.solarHistory.map((s: any) => s.monthly_solar_output_kWh) }]
          }}
          width={screenWidth - 40}
          height={220}
          yAxisSuffix=" kWh"
          chartConfig={chartConfig}
          style={styles.chart}
        />
        <Text style={styles.sectionTitle}>Electricity Usage (Last 2 Entries)</Text>
        <LineChart
          data={{
            labels: history.electricityUsage.map((e: any) => e.state),
            datasets: [{ data: history.electricityUsage.map((e: any) => e.monthly_usage_kWh) }]
          }}
          width={screenWidth - 40}
          height={220}
          yAxisSuffix=" kWh"
          chartConfig={chartConfig}
          style={styles.chart}
        />
        {userData.name ? (
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MainTabs", {} as any)}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#2c2c2c",
  backgroundGradientTo: "#2c2c2c",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(200, 200, 200, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: { r: "6", strokeWidth: "2", stroke: "#4CAF50" }
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#121212",
    alignItems: "center",
    paddingTop: 40,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#4CAF50",
    resizeMode: "cover",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 5,
  },
  greenPoints: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a0e080",
    marginVertical: 10,
    alignSelf: "flex-start",
  },
  chart: {
    marginVertical: 10,
    borderRadius: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#388e3c",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProfileScreen;