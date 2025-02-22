import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import BottomTabNavigator from "./BottomTabNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ImageUploadScreen from "../screens/ImageUploadScreen";
import MapScreen from "@/screens/MapScreen";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserDetails } from "@/hooks/useUser";

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
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
};

const TopNavigationBar = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const localAvatar = require("../assets/images/avatar.png");
  const user = useUserDetails();

  const handleProfilePress = async () => {
    const token = await AsyncStorage.getItem("userEmail");
    if (token) {
      navigation.navigate("ProfileScreen");
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.navContainer}>
      <TouchableOpacity onPress={handleProfilePress}>
        <Image source={localAvatar} style={styles.avatar} />
      </TouchableOpacity>
      <Text style={styles.title}>
        {user && user.name ? `Hi ${user.name}!` : "Welcome to UrjaSetu"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#4CAF50",
    elevation: 3,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 15,
    resizeMode: "cover",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default MainStackNavigator;