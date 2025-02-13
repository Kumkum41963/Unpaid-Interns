import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from '@/Auth/LoginScreen'
import SignUpScreen from '@/Auth/SignUpScreen'

const Stack = createNativeStackNavigator();

const AuthNav = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    )
}

export default AuthNav