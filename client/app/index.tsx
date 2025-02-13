import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
enableScreens();  // Enable optimized screen rendering

import React from "react";
import { Text } from "react-native";
// Native has this by default , so doing again will create nesting -> Error
// import { NavigationContainer } from "@react-navigation/native"; 
import MainStackNavigator from "@/navigation/MainStackNavigator";  // ✅ Import main navigation

export default function App() {
    return (
        // <NavigationContainer> 
            <MainStackNavigator />
            // <Text>Hello from app</Text> 
        // </NavigationContainer>
    );
}
