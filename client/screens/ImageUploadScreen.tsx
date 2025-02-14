import React, { useState } from "react";
import { View, Button, Image, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from "react-native";
import * as ImagePicker from "react-native-image-picker";
import axios from "axios";

const ImageUploadScreen: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<{ productName: string; wasteInfo: any } | null>(null);

  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: "photo", includeBase64: true }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri || null);
      }
    });
  };

  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert("Error", "No image selected");
      return;
    }

    try {
      const blob = await fetch(imageUri).then((response) => response.blob());

      const formData = new FormData();
      formData.append("image", blob, "upload.jpg");

      const res = await axios.post("http://localhost:3000/analyze/suggestion", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResponseData(res.data);
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

      {responseData && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Analysis Result</Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Product Name:</Text> {responseData.productName}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Material Type:</Text> {responseData.wasteInfo.materialType}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Disposal Options:</Text> {responseData.wasteInfo.disposalOptions}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Proper Disposal:</Text> {responseData.wasteInfo.properDisposal}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.boldText}>Recycling Instructions:</Text> {responseData.wasteInfo.recyclingInstructions}
          </Text>

          <TouchableOpacity style={styles.sellButton} onPress={() => console.log("Sell button pressed")}>
            <Text style={styles.sellButtonText}>Sell</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "#F5F5F5", // Light background
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
  card: {
    backgroundColor: "white",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 10,
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#bbbbbb",
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  sellButton: {
    backgroundColor: "#388E3C",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  sellButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ImageUploadScreen;
