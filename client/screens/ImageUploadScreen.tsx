import React, { useState } from "react";
import { View, Image, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { ImageStackParamList } from "@/navigation/ImageStackNavigator";
import { useNavigation } from "@react-navigation/native";
import SocialShareButton from "@/components/ui/SocialShareButton";

type NavigationProps = StackNavigationProp<ImageStackParamList, "ImageUpload">;

const ImageUploadScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<{
    productName: string;
    wasteInfo: {
      disposalOptions: string;
      materialType: string;
      properDisposal: string;
      recyclingInstructions: string;
    };
  } | null>(null);

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
      setResponseData(null);
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
      if (response.data && response.data.productName && response.data.wasteInfo) {
        setResponseData(response.data);
      } else {
        Alert.alert("No suggestions found");
      }
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
  <>
    <View style={styles.suggestionsContainer}>
      <Text style={styles.suggestionsTitle}>Analysis Result:</Text>
      <Text style={styles.suggestionsText}>
        <Text style={styles.boldText}>Product Name:</Text> {responseData.productName}
      </Text>
      <Text style={styles.suggestionsText}>
        <Text style={styles.boldText}>Material Type:</Text> {responseData.wasteInfo.materialType}
      </Text>
      <Text style={styles.suggestionsText}>
        <Text style={styles.boldText}>Disposal Options:</Text> {responseData.wasteInfo.disposalOptions}
      </Text>
      <Text style={styles.suggestionsText}>
        <Text style={styles.boldText}>Proper Disposal:</Text> {responseData.wasteInfo.properDisposal}
      </Text>
      <Text style={styles.suggestionsText}>
        <Text style={styles.boldText}>Recycling Instructions:</Text> {responseData.wasteInfo.recyclingInstructions}
      </Text>
      <SocialShareButton />
    </View>
    <TouchableOpacity style={styles.button} onPress={() => navigation.replace("Map")}>
      <Text style={styles.buttonText}>Sell</Text>
    </TouchableOpacity>
  </>
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
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#a0e080",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
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
  suggestionsContainer: {
    marginTop: 20,
    marginBottom: 30,
    padding: 15,
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    width: "90%",
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 10,
  },
  suggestionsText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default ImageUploadScreen;