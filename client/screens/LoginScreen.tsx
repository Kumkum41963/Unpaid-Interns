import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";

type LoginState = {
  email: string;
  password: string;
};

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginState>({ email: "", password: "" });
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
      <TextInput style={styles.input} placeholder="Email" value={form.email} onChangeText={(text) => handleChange("email", text)} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={form.password} onChangeText={(text) => handleChange("password", text)} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text style={styles.signupLink} onPress={() => navigation.navigate("SignUp")}>
          Sign up
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
  button: { backgroundColor: "#1B5E20", padding: 15, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  signupText: { marginTop: 15, fontSize: 14, color: "#333", textAlign: "center" },
  signupLink: { color: "#1B5E20", fontWeight: "bold" },
});

export default Login;