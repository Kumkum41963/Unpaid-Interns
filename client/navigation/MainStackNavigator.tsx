import React from "react";
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

/* Top Navigation Bar */
const TopNavigationBar = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, "ProfileScreen">>();

  return (
    <View style={styles.navContainer}>
      {/* Profile Avatar (Navigates to ProfileScreen) */}
      <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
        <Image 
          source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }} // Placeholder avatar
          style={styles.avatar} 
        />
      </TouchableOpacity>

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome to UrjaSetu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#050505e5", // Dark background for navbar
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#2933240", // Green border for avatar
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a0e080", // Eco-friendly green for title
  },
});

export default MainStackNavigator;
