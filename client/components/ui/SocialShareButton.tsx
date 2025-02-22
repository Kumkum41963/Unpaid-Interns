import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Share, Image, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Updates from "expo-updates";
import { useUserDetails } from "@/hooks/useUser";

const SocialShareButton: React.FC = () => {
  const autoPost = "Check out my sustainable lifestyle on UrjaSetu! #GreenLiving #Sustainability";
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const user = useUserDetails();

  const pickImageFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== "granted") {
      Alert.alert("Permission Denied", "Camera access is required to take a picture.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const startAnalysis = () => {
    if (!imageUri) {
      Alert.alert("No Image", "Please take a photo first.");
      return;
    }
    setLoading(true);
    setShowShare(false);
    setTimeout(() => {
      setLoading(false);
      setShowShare(true);
    }, 2000);
  };

  const sharePost = async () => {
    setModalVisible(false);
    try {
      if (imageUri) {
        await Share.share({
          message: autoPost,
          url: imageUri,
        });
      } else {
        await Share.share({
          message: autoPost,
        });
      }
      // Use the custom hook's data for email
      const email = user?.email;
      if (!email) {
        Alert.alert("Error", "User email not available");
        return;
      }
      // Call API to increase green points
      const response = await fetch("https://backend-amber-nine-53.vercel.app/api/user/increase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert(
          "Congratulations!",
          "Hey! You just won 15 green points!",
          [{ text: "Ok", onPress: async () => await Updates.reloadAsync() }]
        );
      } else {
        Alert.alert("Info", "Post shared, but green points could not be updated.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.shareButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.shareButtonText}>Disposed?</Text>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
          setLoading(false);
          setShowShare(false);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {!imageUri && !loading && !showShare && (
              <>
                <Text style={styles.modalTitle}>Share with others!</Text>
                <TouchableOpacity style={styles.modalButton} onPress={pickImageFromCamera}>
                  <Text style={styles.modalButtonText}>Take a Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, { backgroundColor: "#ccc" }]} onPress={() => setModalVisible(false)}>
                  <Text style={[styles.modalButtonText, { color: "#333" }]}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
            {imageUri && !loading && !showShare && (
              <>
                <Image source={{ uri: imageUri }} style={styles.previewImage} />
                <TouchableOpacity style={styles.modalButton} onPress={startAnalysis}>
                  <Text style={styles.modalButtonText}>Analyze Image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={pickImageFromCamera}>
                  <Text style={styles.modalButtonText}>Retake Image</Text>
                </TouchableOpacity>
              </>
            )}
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>Analyzing...</Text>
              </View>
            )}
            {showShare && (
              <>
                <Text style={styles.modalTitle}>Analysis Complete!</Text>
                <TouchableOpacity style={styles.modalButton} onPress={sharePost}>
                  <Text style={styles.modalButtonText}>Share Post</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, { backgroundColor: "#ccc" }]} onPress={() => setModalVisible(false)}>
                  <Text style={[styles.modalButtonText, { color: "#333" }]}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  shareButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  shareButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  previewImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 15,
  },
  loadingContainer: {
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "bold",
  },
});

export default SocialShareButton;