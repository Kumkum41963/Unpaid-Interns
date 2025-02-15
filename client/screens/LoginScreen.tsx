import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

type LoginState = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginState>({ email: "", password: "" });

  const handleChange = (key: keyof LoginState, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://backend-amber-nine-53.vercel.app/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("userEmail", form.email);
      Alert.alert("Success", "Logged in successfully");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to log in");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        keyboardType="email-address"
        placeholderTextColor="#A0A0A0" // Light gray placeholder
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
        secureTextEntry
        placeholderTextColor="#A0A0A0" // Light gray placeholder
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#121212", // Dark background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#E0E0E0", // Light text for contrast
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4CAF50", // Sustainable green border
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: "#E0E0E0", // White text for input
    backgroundColor: "#1A1A1A", // Dark input background
  },
  button: {
    backgroundColor: "#4CAF50", // Green for sustainability
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 15,
    fontSize: 14,
    color: "#E0E0E0", // Light gray text
    textAlign: "center",
  },
  signupLink: {
    color: "#4CAF50", // Green for the signup link
    fontWeight: "bold",
  },
});

export default Login;
