import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/types"; // Import RootStack types

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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "SignUp">>();
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
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
<<<<<<< HEAD
    try { //https://server-9rhaibbzc-himanshus-projects-75c1b240.vercel.app
      const response = await fetch("https://backend-amber-nine-53.vercel.app/api/user/register", {
=======
    try {
      const response = await fetch("https://backend-amber-nine-53.vercel.app/api/vendor/register", {
>>>>>>> 365f1f97f2a1b34a36af3372b1eb02f403b29e92
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
      navigation.replace("Login"); // Redirect to login after successful signup
    } catch (error) {
<<<<<<< HEAD
      console.log(error)
=======
      console.log("Error at register:", error);
>>>>>>> 365f1f97f2a1b34a36af3372b1eb02f403b29e92
      Alert.alert("Error", "Failed to register");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Name Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={form.name}
          onChangeText={(text) => handleChange("name", text)}
          placeholderTextColor="#A0A0A0"
        />
      </View>

      {/* Email Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
          placeholderTextColor="#A0A0A0"
        />
      </View>

      {/* Password Field */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Create a strong password"
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry
          placeholderTextColor="#A0A0A0"
        />
      </View>

      {/* Address Fields */}
      <Text style={styles.sectionTitle}>Address</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Street</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your street address"
          value={form.street}
          onChangeText={(text) => handleChange("street", text)}
          placeholderTextColor="#A0A0A0"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your city"
          value={form.city}
          onChangeText={(text) => handleChange("city", text)}
          placeholderTextColor="#A0A0A0"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>State</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your state"
          value={form.state}
          onChangeText={(text) => handleChange("state", text)}
          placeholderTextColor="#A0A0A0"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your country"
          value={form.country}
          onChangeText={(text) => handleChange("country", text)}
          placeholderTextColor="#A0A0A0"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Zip Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your zip code"
          value={form.zip}
          onChangeText={(text) => handleChange("zip", text)}
          keyboardType="numeric"
          placeholderTextColor="#A0A0A0"
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Already have an account? */}
      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text style={styles.loginLink} onPress={() => navigation.navigate("Login")}>
          Log in
        </Text>
      </Text>
    </ScrollView>
  );
};

/* 🎨 Updated Styles */
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#E0E0E0",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 15,
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#E0E0E0",
    marginBottom: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    color: "#E0E0E0",
    backgroundColor: "#1A1A1A",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 15,
    fontSize: 14,
    color: "#E0E0E0",
    textAlign: "center",
  },
  loginLink: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
});

export default SignUp;
