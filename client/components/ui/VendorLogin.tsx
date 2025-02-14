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
      {Object.entries(form).map(([key, value]) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={value}
          onChangeText={(text) => handleChange(key as keyof LoginState, text)}
          secureTextEntry={key === "password"}
          keyboardType={key === "phone" ? "phone-pad" : "default"}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", padding: 15, marginBottom: 15, borderRadius: 8 },
  button: { backgroundColor: "#1B5E20", paddingVertical: 14, borderRadius: 8, alignItems: "center", width: "100%" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default VendorLogin;