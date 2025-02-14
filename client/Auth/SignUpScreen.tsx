import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

type FormState = {
  name: string;
  email: string;
  password: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
};

const SignUp: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: "", email: "", password: "", street: "", city: "", state: "", country: "", zip: "" });

  const handleChange = (key: keyof FormState, value: string) => setForm({ ...form, [key]: value });

  const handleSubmit = async () => {
    try {
      const response = await fetch("exp://192.168.0.104:8081", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          address: {
            street: form.street,
            city: form.city,
            state: form.state,
            country: form.country,
            zip: form.zip
          }
        }),
      });
      const data = await response.json();
      Alert.alert("Success", data.message || "Registered successfully");
    } catch (error) {
      console.log("error at register", error);
      Alert.alert("Error", "Failed to register");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {Object.keys(form).map((key) => (
        <TextInput 
          key={key} 
          style={styles.input} 
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)} 
          value={form[key as keyof FormState]} 
          onChangeText={(text) => handleChange(key as keyof FormState, text)} 
          secureTextEntry={key === "password"} 
          placeholderTextColor="#A0A0A0" // Light gray placeholder
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#121212", // Dark background for a sustainable look
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
    color: "#E0E0E0", // Light text inside input fields
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
});

export default SignUp;
