import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

type FormState = {
  name: string;
  phone: string;
  password: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
};

const VendorSignUp: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    password: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/vendor/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          address: {
            street: form.street,
            city: form.city,
            state: form.state,
            country: form.country,
            zip: form.zip,
          },
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
      <Text style={styles.title}>Vendor Sign Up</Text>
      {Object.entries(form).map(([key, value]) => (
        <TextInput
          key={key}
          style={styles.input}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={value}
          onChangeText={(text) => handleChange(key as keyof FormState, text)}
          secureTextEntry={key === "password"}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        Already have an account? <Text style={styles.loginLink}>Log in</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", padding: 15, borderWidth: 1, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: "#1B5E20", paddingVertical: 14, borderRadius: 8, alignItems: "center", width: "100%" },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  loginText: { marginTop: 15, fontSize: 14 },
  loginLink: { color: "#1B5E20", fontWeight: "bold" },
});

export default VendorSignUp;