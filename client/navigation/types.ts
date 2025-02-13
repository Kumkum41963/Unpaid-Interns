import { NavigatorScreenParams } from "@react-navigation/native";

// ✅ Define valid routes for Root Stack Navigator
export type RootStackParamList = {
    Home: undefined;
    ProfileScreen: undefined; // ✅ Ensure ProfileScreen is included
    Login: undefined;
    SignUp: undefined;
    About: undefined;
};

// ✅ Define valid routes for Bottom Tab Navigator
export type BottomTabParamList = {
    Home: undefined;
    Solar: NavigatorScreenParams<SolarStackParamList>; // Solar Stack
    Electricity: NavigatorScreenParams<ElectricityStackParamList>; // Electricity Stack
    MarketPlace: undefined;
    Plus: undefined; // Floating Button (No screen assigned)
};

// ✅ Define Solar Stack Routes
export type SolarStackParamList = {
    SolarCalculator: undefined;
    SolarResult: { result: string }; // Expected params for Solar Result
};

// ✅ Define Electricity Stack Routes
export type ElectricityStackParamList = {
    ElectricityCalculator: undefined;
    ElectricityResult: { result: string }; // Expected params for Electricity Result
};
