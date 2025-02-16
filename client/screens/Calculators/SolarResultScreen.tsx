import { View, StyleSheet, Button, Alert } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import ResultCard from "@/components/ui/ResultCard";
import { SolarStackParamList } from "@/navigation/types"; // ✅ Import the type

export default function SolarResultScreen() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<SolarStackParamList, "SolarResult">>(); // ✅ Define correct type
    const data = route.params?.result ? JSON.parse(route.params.result) : null; // ✅ Ensure safe parsing

    if (!data) {
        Alert.alert("Error", "Invalid data received.");
        navigation.goBack(); // Go back if data is missing
        return null;
    }

    return (
        <View style={styles.container}>
            {/* Heading */}
            <View style={styles.headerContainer}>
                <ResultCard
                    title="Solar Energy Result"
                    data={[
                        { label: "State", value: data?.state || "N/A" },
                        { label: "Country", value: data?.country || "N/A" },
                        { label: "Panel Type", value: data?.panel_type || "N/A" },
                        { label: "Daily Output", value: `${data?.daily_solar_output_kWh || 0} kWh` },
                        { label: "Monthly Output", value: `${data?.monthly_solar_output_kWh || 0} kWh` }
                    ]}
                />
            </View>

            {/* Back Button */}
            <Button title="Back to Calculator" onPress={() => navigation.goBack()} color="#388e3c" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 40, // Ensures content starts at the top
        backgroundColor: "#121212", // Dark mode background
    },
    headerContainer: {
        marginBottom: 20,
    },
});
