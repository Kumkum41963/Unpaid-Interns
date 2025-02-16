import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./types";
import { TouchableOpacity, StyleSheet, View, Animated } from "react-native";

// Import Screens
import HomeScreen from "../screens/HomeScreen";
import MarketPlaceScreen from "../screens/MarketPlaceScreen";

// Import Stack Navigators
import SolarStackNavigator from "./SolarStackNavigator";
import ElectricityStackNavigator from "./ElectricityStackNavigator";

const Tab = createBottomTabNavigator();

type NavigationProps = StackNavigationProp<RootStackParamList, "ImageUploadScreen">;

const FloatingButton = () => {
    const navigation = useNavigation<NavigationProps>();
    const [scale] = useState(new Animated.Value(1));

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 1.1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View style={[styles.floatingButtonContainer, { transform: [{ scale }] }]}>
            <TouchableOpacity 
                onPress={() => navigation.navigate("ImageUploadScreen")}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.floatingButton}
            >
                <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
        </Animated.View>
    );
};

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon name="home" focused={focused} />,
                }}
            />

            <Tab.Screen
                name="Solar"
                component={SolarStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon name="sunny" focused={focused} />,
                }}
            />

            <Tab.Screen
                name="Plus"
                options={{
                    tabBarButton: () => <FloatingButton />, // ✅ Floating button is now inside the box
                }}
            >
                {() => null}
            </Tab.Screen>

            <Tab.Screen
                name="Electricity"
                component={ElectricityStackNavigator}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon name="flash" focused={focused} />,
                }}
            />

            <Tab.Screen
                name="MarketPlace"
                component={MarketPlaceScreen}
                options={{
                    tabBarIcon: ({ focused }) => <TabIcon name="cart" focused={focused} />,
                }}
            />
        </Tab.Navigator>
    );
};

// ✅ Custom Tab Icon with Proper Alignment
const TabIcon = ({ name, focused }: { name: any; focused: boolean }) => {
    return (
        <View style={styles.iconContainer}>
            <Ionicons name={name} size={28} color={focused ? "#4CAF50" : "#A0A0A0"} />
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        height: 90, // ✅ Increased height so floating button is inside
        backgroundColor: "#1A1A1A", // ✅ Dark Grayish-Black for Sustainable Feel 🌑
        borderTopWidth: 0,
        borderRadius: 25,
        position: "absolute",
        left: 10,
        right: 10,
        bottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: -2 },
        elevation: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30, // ✅ Ensures even spacing
        paddingBottom: 15, // ✅ Moves icons up to fit floating button
    },
    floatingButtonContainer: {
        position: "absolute",
        bottom: 0.3,  // 🔼 Adjusted from 10 → Moves it slightly up inside the tab bar
        left: "10%",
        transform: [{ translateX: -30 }], // ✅ Centers correctly
        zIndex: 10,
    },
    floatingButton: {
        backgroundColor: "#4CAF50", // ✅ Green for sustainability
        width: 70, // ✅ Fits well inside the tab bar
        height: 70,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.4,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 10,
        borderWidth: 3,
        borderColor: "#1A1A1A", // ✅ Matches Tab Bar
    },
      
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        width: 50, // ✅ Keeps icons inside tab bar
        height: 50,
    },
});

export default BottomTabNavigator;
