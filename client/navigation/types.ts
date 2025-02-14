import { NavigatorScreenParams } from "@react-navigation/native";

// ✅ Root Stack Navigator (Main Navigation)
export type RootStackParamList = {
    MainTabs: NavigatorScreenParams<BottomTabParamList>; 
    ProfileScreen: undefined;
    Login: undefined;
    SignUp: undefined;
    About: undefined;
    ImageUploadScreen: undefined; // ✅ Added for floating button navigation
};

// ✅ Bottom Tab Navigator (Tab Navigation)
export type BottomTabParamList = {
    Home: undefined;
    Solar: NavigatorScreenParams<SolarStackParamList>; 
    Electricity: NavigatorScreenParams<ElectricityStackParamList>; 
    MarketPlace: undefined;
    Plus: undefined; // ✅ Floating Button (No screen assigned)
};

// ✅ Solar Stack Routes
export type SolarStackParamList = {
    SolarCalculator: undefined;
    SolarResult: { result: string };
};

// ✅ Electricity Stack Routes
export type ElectricityStackParamList = {
    ElectricityCalculator: undefined;
    ElectricityResult: { result: string };
};
