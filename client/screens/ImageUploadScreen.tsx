import React, { useState } from "react";
import { View, Button, Image, Text, StyleSheet, Alert } from "react-native";
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
                headers: { 
                    "Content-Type": "multipart/form-data",
                },
            });

            setResponseData(res.data);
        } catch (error: any) {
            Alert.alert("Error", error.response?.data || error.message);
        }
    };

    return (
        <View style={styles.container}>
            {/* Heading */}
            <Text style={styles.heading}>Waste Analyzer</Text>
            <Text style={styles.description}>Upload an image to get disposal and recycling suggestions.</Text>

            <Button title="Pick an Image" onPress={pickImage} color="#388e3c" />
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            {imageUri && <Button title="Upload Image" onPress={uploadImage} color="#a0e080" />}

            {responseData && (
                <View style={styles.responseContainer}>
                    <Text style={styles.title}>Product Name: {responseData.productName}</Text>
                    <Text style={styles.subtitle}>Material Type: {responseData.wasteInfo.materialType}</Text>
                    <Text style={styles.subtitle}>Disposal Options: {responseData.wasteInfo.disposalOptions}</Text>
                    <Text style={styles.subtitle}>Proper Disposal: {responseData.wasteInfo.properDisposal}</Text>
                    <Text style={styles.subtitle}>Recycling Instructions: {responseData.wasteInfo.recyclingInstructions}</Text>
                    <Button title="Sell" onPress={() => console.log("Sell button pressed")} color="#FF5733" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40, // Pushes content to the top
        backgroundColor: "#121212", // Dark mode theme
        alignItems: "center",
    },
    heading: {
        fontSize: 30, // Bigger heading for emphasis
        fontWeight: "bold",
        color: "#a0e080", // Green for eco-friendly look
        textAlign: "center",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: "#bbbbbb",
        textAlign: "center",
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 20,
        borderRadius: 10,
    },
    responseContainer: {
        marginTop: 20,
        width: "100%",
        backgroundColor: "#1e1e1e",
        padding: 15,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: "#bbbbbb",
        marginBottom: 5,
    },
});

export default ImageUploadScreen;
