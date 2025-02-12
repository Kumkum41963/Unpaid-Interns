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
      const response = await fetch("http://localhost:3000/user/register", {
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
      Alert.alert("Error", "Failed to register");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {Object.keys(form).map((key) => (
        <TextInput key={key} style={styles.input} placeholder={key.charAt(0).toUpperCase() + key.slice(1)} value={form[key as keyof FormState]} onChangeText={(text) => handleChange(key as keyof FormState, text)} secureTextEntry={key === "password"} />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
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

export default SignUp;