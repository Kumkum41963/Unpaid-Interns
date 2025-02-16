// App.tsx
import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
<<<<<<< HEAD
enableScreens();

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "@/navigation/MainStackNavigator";
import SignUp from "@/screens/SignUpScreen";
import ImageUploadScreen from "@/screens/WasteAnalyzeScreen";
import Marketplace from "@/screens/MarketPlaceScreen";

export default function App() {
    return (
        // <NavigationContainer>
        //     <MainStackNavigator />
        // </NavigationContainer>
        <SignUp />
=======
enableScreens(); // Enable optimized screen rendering

import React from "react";
import MainStackNavigator from "@/navigation/MainStackNavigator";

export default function App() {
    return (
        <MainStackNavigator />
>>>>>>> 365f1f97f2a1b34a36af3372b1eb02f403b29e92
    );
}