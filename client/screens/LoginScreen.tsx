import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/types";

type LoginState = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginState>({ email: "", password: "" });
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "Login">>();

  const handleChange = (key: keyof LoginState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://backend-amber-nine-53.vercel.app/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      await AsyncStorage.setItem("authToken", data.token);
      await AsyncStorage.setItem("userEmail", form.email);
      Alert.alert("Success", "Logged in successfully");
      navigation.replace("ProfileScreen");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to log in");
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry
          placeholderTextColor="#A0A0A0"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        Don't have an account?{' '}
        <Text style={styles.signupLink} onPress={() => navigation.navigate("SignUp")}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#121212",
    paddingTop: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#E0E0E0",
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E0E0E0",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#75d73c",
    padding: 12,
    borderRadius: 8,
    color: "#E0E0E0",
    backgroundColor: "#1A1A1A",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 25,
    fontSize: 18,
    color: "#E0E0E0",
    textAlign: "center",
    fontWeight: "bold",
  },
  signupLink: {
    color: "#5dc860",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default Login;