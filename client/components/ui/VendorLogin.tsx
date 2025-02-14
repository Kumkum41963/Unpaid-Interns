import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

type LoginState = {
  phone: string;
  password: string;
};

const VendorLogin: React.FC = () => {
  const [form, setForm] = useState<LoginState>({ phone: "", password: "" });

  const handleChange = (key: keyof LoginState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/vendor/login", {
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
      await AsyncStorage.setItem("vendorPhone", form.phone);
      Alert.alert("Success", "Logged in successfully");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to log in");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendor Login</Text>
      {/* Render form inputs dynamically */}
      {Object.entries(form).map(([key, value]) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)} // Dynamic placeholder
          value={value}
          onChangeText={(text) => handleChange(key as keyof LoginState, text)}
          secureTextEntry={key === "password"} // Secure text entry for password
          keyboardType={key === "phone" ? "phone-pad" : "default"} // Specific keyboard type for phone
          placeholderTextColor="#bbb" // Light gray placeholder text
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#121212", // Dark mode background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#a0e080", // Green for eco-friendly touch
  },
  input: {
    borderWidth: 1,
    borderColor: "#2e7d32", // Green border for input fields
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    color: "#ffffff", // White text in inputs
    backgroundColor: "#1e1e1e", // Dark background for inputs
  },
  button: {
    backgroundColor: "#388e3c", // Green for login button
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VendorLogin;
