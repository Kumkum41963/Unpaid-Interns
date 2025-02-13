import React, { useState } from "react";
import { View, Button, Image, Text } from "react-native";
import * as ImagePicker from "react-native-image-picker";
import axios from "axios";

const ImageUploadScreen: React.FC = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [responseData, setResponseData] = useState<{ productName: string; wasteInfo: any } | null>(null);

    const pickImage = () => {
        ImagePicker.launchImageLibrary({ mediaType: "photo", includeBase64: true }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets?.[0]?.uri || null);
                uploadImage(response.assets[0].base64 || "");
            }
        });
    };

    const uploadImage = async (base64: string) => {
        try {
            const res = await axios.post("http://localhost:3000/analyze/suggestion", { image: base64 });
            setResponseData(res.data);
        } catch (error) {
            console.error("Error uploading image");
        }
    };

    return (
        <View>
            <Button title="Pick an Image" onPress={pickImage} />
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
            {responseData && (
                <View>
                    <Text>Product Name: {responseData.productName}</Text>
                    <Button title="Sell" onPress={() => console.log("Sell button pressed")} />
                </View>
            )}
        </View>
    );
};

export default ImageUploadScreen;