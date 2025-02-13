import { NavigatorScreenParams } from "@react-navigation/native";

// Define valid routes for Stack Navigator
export type RootStackParamList = {
    BottomTabs: NavigatorScreenParams<BottomTabParamList>; // This includes the bottom tabs
    WasteAnalyzeScreen: undefined; // No parameters expected for this screen
};

// Define valid routes for Bottom Tab Navigator
export type BottomTabParamList = {
    Home: undefined;
    Solar: undefined;
    Electricity: undefined;
    MarketPlace: undefined;
    Plus: undefined; // For Floating Button (No screen assigned)
};
