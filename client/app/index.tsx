// App.tsx
import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
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
    );
}