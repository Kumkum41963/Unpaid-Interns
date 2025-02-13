import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";

// Import Screens
import HomeScreen from "../screens/HomeScreen";
import MarketPlaceScreen from "../screens/MarketPlaceScreen";

// Import Stack Navigators
import SolarStackNavigator from "./SolarStackNavigator";
import ElectricityStackNavigator from "./ElectricityStackNavigator";

const Tab = createBottomTabNavigator();

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
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="home" size={24} color={focused ? "#0B5D1E" : "#999"} />
                    ),
                }}
            />

            <Tab.Screen
                name="Solar"
                component={SolarStackNavigator} // ✅ Use Stack for Solar navigation
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="sunny" size={24} color={focused ? "#0B5D1E" : "#999"} />
                    ),
                }}
            />

            {/* Floating Button (No Floating Button Component) */}
            <Tab.Screen
                name="Plus"
                component={() => null}
                options={{
                    tabBarButton: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("WasteAnalyzeScreen")}
                            style={styles.floatingButton}
                        >
                            <Ionicons name="add" size={30} color="#fff" />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Tab.Screen
                name="Electricity"
                component={ElectricityStackNavigator} // ✅ Use Stack for Electricity navigation
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="flash" size={24} color={focused ? "#0B5D1E" : "#999"} />
                    ),
                }}
            />

            <Tab.Screen
                name="MarketPlace"
                component={MarketPlaceScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons name="cart" size={24} color={focused ? "#0B5D1E" : "#999"} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    floatingButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#007BFF",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default BottomTabNavigator;

