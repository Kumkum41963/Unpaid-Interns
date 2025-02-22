import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ImageUploadScreen from "../screens/ImageUploadScreen";
import MapScreen from "../screens/MapScreen";

export type ImageStackParamList = {
  ImageUpload: undefined;
  Map: undefined;
};

const Stack = createStackNavigator<ImageStackParamList>();

export default function ImageStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ImageUpload" component={ImageUploadScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
}