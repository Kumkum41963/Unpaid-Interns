import { View, StyleSheet, Button, Alert } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import ResultCard from "@/components/ui/ResultCard";
import { ElectricityStackParamList } from "@/navigation/types"; // ✅ Import the type

export default function ElectricityResultScreen() {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<ElectricityStackParamList, "ElectricityResult">>(); // ✅ Define correct type
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
                    title="Electricity Usage Result"
                    data={[
                        { label: "Method", value: data?.method || "N/A" },
                        { label: "Monthly Usage", value: `${data?.calculatedMonthlyUsage_kwh || data?.estimatedMonthlyUsage_kwh || 0} kWh` }
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
