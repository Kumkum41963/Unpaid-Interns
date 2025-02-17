import React, { useState } from "react";
import { View, Image, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const ImageUploadScreen: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Storage access is required to select images.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
      setSuggestions(null); // Reset suggestions when new image is selected
    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert("Error", "No image selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", { uri: imageUri, name: "upload.jpg", type: "image/jpeg" } as any);

      const response = await axios.post("https://backend-amber-nine-53.vercel.app/api/analyze/suggestion", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("API Response:", response.data); // Debugging: Check what API returns

      if (response.data.suggestions) {
        setSuggestions(response.data.suggestions);
      } else {
        Alert.alert("No suggestions found");
      }
    } catch (error: any) {
      console.error("Upload error:", error);
      Alert.alert("Error", error.response?.data || error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Upload & Analyze Image</Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Select an Image</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

      {imageUri && (
        <TouchableOpacity style={styles.button} onPress={uploadImage}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
      )}

      {suggestions && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Suggestions:</Text>
          <Text style={styles.suggestionsText}>{suggestions}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", justifyContent: "center", padding: 20, backgroundColor: "#F5F5F5" },
  title: { fontSize: 22, fontWeight: "bold", color: "#1B5E20", marginBottom: 20 },
  button: { backgroundColor: "#1B5E20", paddingVertical: 14, paddingHorizontal: 20, borderRadius: 8, alignItems: "center", width: "90%", marginBottom: 15 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  image: { width: 250, height: 250, marginVertical: 15, borderRadius: 10, borderWidth: 1, borderColor: "#CCC" },
  suggestionsContainer: { marginTop: 20, padding: 10, backgroundColor: "#E3F2FD", borderRadius: 8, width: "90%" },
  suggestionsTitle: { fontSize: 18, fontWeight: "bold", color: "#1B5E20", marginBottom: 5 },
  suggestionsText: { fontSize: 16, color: "#333" },
});

export default ImageUploadScreen;