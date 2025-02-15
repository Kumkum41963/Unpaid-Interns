import React, { useState } from "react";
import { View, Image, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

const ImageUploadScreen: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async () => {
    const response = await launchImageLibrary({ mediaType: "photo", includeBase64: false });
    if (response.assets && response.assets.length > 0) {
      setImageUri(response.assets[0].uri ?? null);
    }
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert("Error", "No image selected");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        name: "upload.jpg",
        type: "image/jpeg",
      } as any);

      const res = await axios.post("https://backend-amber-nine-53.vercel.app/api/analyze/suggestion", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Success", "Image uploaded successfully!");
    } catch (error: any) {
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1B5E20",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    width: "90%",
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 250,
    height: 250,
    marginVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCC",
  },
});

export default ImageUploadScreen;