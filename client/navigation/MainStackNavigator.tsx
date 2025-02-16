import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import BottomTabNavigator from "./BottomTabNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen"; 
import SignUpScreen from "../screens/SignUpScreen";
import ImageUploadScreen from "../screens/ImageUploadScreen";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => <TopNavigationBar />,
      }}
    >
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Login" component={LoginScreen} /> 
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ImageUploadScreen" component={ImageUploadScreen} />
    </Stack.Navigator>
  );
};

/* 🏷️ Top Navigation Bar */
const TopNavigationBar = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  const randomCaricatureAvatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Alex",
    "https://api.dicebear.com/7.x/micah/svg?seed=Chris",
    "https://api.dicebear.com/7.x/personas/svg?seed=Charlie",
    "https://api.dicebear.com/7.x/identicon/svg?seed=Robin",
  ];

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const storedAvatar = await AsyncStorage.getItem("userAvatar");

      if (token) {
        setIsLoggedIn(true);
        if (storedAvatar) {
          setProfileImage(storedAvatar);
        } else {
          const randomAvatar =
            randomCaricatureAvatars[Math.floor(Math.random() * randomCaricatureAvatars.length)];
          setProfileImage(randomAvatar);
          await AsyncStorage.setItem("userAvatar", randomAvatar);
        }
      } else {
        setIsLoggedIn(false);
        setProfileImage("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
      }
    };

    checkAuth();
  }, []);

  const handleProfilePress = async () => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      navigation.navigate("ProfileScreen");  
    } else {
      navigation.navigate("Login");  
    }
  };

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity onPress={handleProfilePress}>
        <Image source={{ uri: profileImage }} style={styles.avatar} />
      </TouchableOpacity>
      <Text style={styles.title}>Welcome to UrjaSetu</Text>
    </View>
  );
};

/* 🎨 Styles */
const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#4CAF50",
    elevation: 3,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default MainStackNavigator;
