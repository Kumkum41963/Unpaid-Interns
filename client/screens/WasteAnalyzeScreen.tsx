import React, { useState } from "react";
import { View, Button, Image, Text, StyleSheet } from "react-native";
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
            console.error("No image selected");
            return;
        }

        const blob = await fetch(imageUri).then((response) => response.blob());

        const formData = new FormData();
        formData.append("image", blob, "upload.jpg");

        try {
            const res = await axios.post("http://localhost:3000/analyze/suggestion", formData, {
                headers: { 
                    "Content-Type": "multipart/form-data",
                },
            });
            setResponseData(res.data);
        } catch (error: any) {
            console.error("Error uploading image:", error.response?.data || error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Pick an Image" onPress={pickImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            {imageUri && <Button title="Upload Image" onPress={uploadImage} />}
            {responseData && (
                <View style={styles.responseContainer}>
                    <Text style={styles.title}>Product Name: {responseData.productName}</Text>
                    <Text style={styles.subtitle}>Material Type: {responseData.wasteInfo.materialType}</Text>
                    <Text style={styles.subtitle}>Disposal Options: {responseData.wasteInfo.disposalOptions}</Text>
                    <Text style={styles.subtitle}>Proper Disposal: {responseData.wasteInfo.properDisposal}</Text>
                    <Text style={styles.subtitle}>Recycling Instructions: {responseData.wasteInfo.recyclingInstructions}</Text>
                    <Button title="Sell" onPress={() => console.log("Sell button pressed")} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },
    responseContainer: {
        marginTop: 20,
        width: "100%",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default ImageUploadScreen;