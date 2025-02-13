import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import WasteAnalyzeScreen from "../screens/WasteAnalyzeScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="BottomTabs" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="BottomTabs" component={BottomTabNavigator} />
            <Stack.Screen name="WasteAnalyzeScreen" component={WasteAnalyzeScreen} />
        </Stack.Navigator>
    );
};

export default MainStackNavigator;




