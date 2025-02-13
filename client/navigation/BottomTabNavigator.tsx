import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabParamList } from "./types";

// Import Screens
import HomeScreen from "../screens/HomeScreen";
import SolarScreen from "../screens/Calculators/SolarCalculatorScreen";
import ElectricityScreen from "../screens/Calculators/ElectricityCalculatorScreen";
import MarketPlaceScreen from "../screens/MarketPlaceScreen";

// Import Floating Button
import FloatingButton from "../components/ui/FloatingButton";

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createStackNavigator();

const createStack = (screen: React.ComponentType, name: string) => () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={name} component={screen} />
    </Stack.Navigator>
);

const BottomTabNavigator = ({ navigation }: any) => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { height: 70, backgroundColor: "#fff" },
            }}
        >
            <Tab.Screen
                name="Home"
                component={createStack(HomeScreen, "Home")}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="home" size={24} color={focused ? "#0B5D1E" : "#999"} />
                    ),
                }}
            />

            <Tab.Screen
                name="Solar"
                component={createStack(SolarScreen, "Solar")}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="sunny" size={24} color={focused ? "#0B5D1E" : "#999"} />
                    ),
                }}
            />

            {/* Floating Button (Opens WasteAnalyzeScreen) */}
            <Tab.Screen
                name="Plus"
                component={() => null}
                options={{
                    tabBarButton: () => (
                        <FloatingButton onPress={() => navigation.navigate("WasteAnalyzeScreen")} />
                    ),
                }}
            />

            <Tab.Screen
                name="Electricity"
                component={createStack(ElectricityScreen, "Electricity")}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="flash" size={24} color={focused ? "#0B5D1E" : "#999"} />
                    ),
                }}
            />

            <Tab.Screen
                name="MarketPlace"
                component={createStack(MarketPlaceScreen, "MarketPlace")}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="cart" size={24} color={focused ? "#0B5D1E" : "#999"} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;




