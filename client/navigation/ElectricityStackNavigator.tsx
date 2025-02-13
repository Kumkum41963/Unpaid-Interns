import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ElectricityCalculatorScreen from "../screens/Calculators/ElectricityCalculatorScreen";
import ElectricityResultScreen from "../screens/Calculators/ElectricityResultScreen";

// ✅ Define type for the navigator
export type ElectricityStackParamList = {
    ElectricityCalculator: undefined;
    ElectricityResult: { result: string };
};

// ✅ Create the StackNavigator with types
const Stack = createStackNavigator<ElectricityStackParamList>();

const ElectricityStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ElectricityCalculator" component={ElectricityCalculatorScreen} />
            <Stack.Screen name="ElectricityResult" component={ElectricityResultScreen} />
        </Stack.Navigator>
    );
};

export default ElectricityStackNavigator;
