import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SolarCalculatorScreen from "../screens/Calculators/SolarCalculatorScreen";
import SolarResultScreen from "../screens/Calculators/SolarResultScreen";

// ✅ Define type for the navigator
export type SolarStackParamList = {
    SolarCalculator: undefined;
    SolarResult: { result: string };
};

// ✅ Create the StackNavigator with types
const Stack = createStackNavigator<SolarStackParamList>();

const SolarStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SolarCalculator" component={SolarCalculatorScreen} />
            <Stack.Screen name="SolarResult" component={SolarResultScreen} />
        </Stack.Navigator>
    );
};

export default SolarStackNavigator;

