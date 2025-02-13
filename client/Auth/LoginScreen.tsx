import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

type LoginState = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginState>({ email: "", password: "" });

  const handleChange = (key: keyof LoginState, value: string) => setForm({ ...form, [key]: value });

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/login", {
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
      <TextInput style={styles.input} placeholder="Email" value={form.email} onChangeText={(text) => handleChange("email", text)} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={form.password} onChangeText={(text) => handleChange("password", text)} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  button: { backgroundColor: "blue", padding: 15, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" }
});

export default Login;