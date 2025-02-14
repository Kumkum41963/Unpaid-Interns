// MainStackNavigator.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MapScreen from "@/screens/MapScreen";
import ImageUploadScreen from "@/screens/WasteAnalyzeScreen";
import VendorSignUp from "@/components/ui/VendorSignUp";
import VendorLogin from "@/components/ui/VendorLogin";
import SignUp from "@/screens/SignUpScreen";
import Login from "@/screens/LoginScreen";
import Marketplace from "@/screens/MarketPlaceScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="WasteAnalyze" component={ImageUploadScreen} />
            <Stack.Screen name="VendorSignUp" component={VendorSignUp} />
            <Stack.Screen name="VendorLogin" component={VendorLogin} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Marketplace" component={Marketplace} />
        </Stack.Navigator>
    );
};

export default MainStackNavigator;