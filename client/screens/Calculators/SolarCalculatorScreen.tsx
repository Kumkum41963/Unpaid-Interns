import { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SolarStackParamList } from "@/navigation/types";
import { calculateSolarEnergy } from "@/api/solarApi";

// Define navigation type
type NavigationProps = StackNavigationProp<SolarStackParamList, "SolarCalculator">;

export default function SolarCalculatorScreen() {
    const navigation = useNavigation<NavigationProps>();

    // State variables for inputs
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [rooftopArea, setRooftopArea] = useState("");
    const [panelType, setPanelType] = useState("monocrystalline"); // Default selection
    const [loading, setLoading] = useState(false);

    // Function to handle calculation
    const handleCalculate = async () => {
        if (!state || !country || !rooftopArea || !panelType) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        try {
            setLoading(true);
            const result = await calculateSolarEnergy({
                state,
                country,
                rooftop_area: Number(rooftopArea),
                panel_type: panelType,
            });
            setLoading(false);
            navigation.navigate("SolarResult", { result: JSON.stringify(result) });

            // ✅ Clear inputs after submission
            setState("");
            setCountry("");
            setRooftopArea("");
            setPanelType("Monocrystalline");
        } catch (error) {
            setLoading(false);
            Alert.alert("Error", "Something went wrong!");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Centered Heading & Description */}
            <Text style={styles.heading}>Solar Rooftop Calculator</Text>
            <Text style={styles.description}>
                Estimate your solar energy potential and optimize your energy savings.
            </Text>

            {/* Input Fields */}
            <Text style={styles.label}>State</Text>
            <TextInput
                value={state}
                onChangeText={setState}
                placeholder="Enter state"
                keyboardType="default"
                autoCapitalize="words"
                style={styles.input}
                placeholderTextColor="#888"
            />

            <Text style={styles.label}>Country</Text>
            <TextInput
                value={country}
                onChangeText={setCountry}
                placeholder="Enter country"
                keyboardType="default"
                autoCapitalize="words"
                style={styles.input}
                placeholderTextColor="#888"
            />

            <Text style={styles.label}>Rooftop Area (sq ft)</Text>
            <TextInput
                value={rooftopArea}
                onChangeText={setRooftopArea}
                placeholder="Enter area"
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor="#888"
            />

            <Text style={styles.label}>Panel Type</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={panelType}
                    onValueChange={(itemValue) => setPanelType(itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#a0e080"
                >
                    <Picker.Item label="Monocrystalline" value="Monocrystalline" />
                    <Picker.Item label="Polycrystalline" value="Polycrystalline" />
                    <Picker.Item label="Thin-Film" value="Thin-Film" />
                </Picker>
            </View>

            {/* Loading Indicator & Button */}
            {loading ? (
                <ActivityIndicator size="large" color="#a0e080" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleCalculate}>
                    <Text style={styles.buttonText}>Calculate</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 40, // Pushes everything to the top
        backgroundColor: "#121212", // Dark mode
    },
    heading: {
        fontSize: 32, // Bigger heading for better impact
        fontWeight: "bold",
        color: "#a0e080", // Eco-friendly green
        textAlign: "center",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: "#bbbbbb",
        textAlign: "center",
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#a0e080",
        marginBottom: 5,
    },
    input: {
        width: "100%",
        height: 45,
        borderWidth: 1,
        borderColor: "#2e7d32",
        borderRadius: 8,
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        paddingHorizontal: 12,
        marginBottom: 15,
    },
    pickerContainer: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#2e7d32",
        borderRadius: 8,
        backgroundColor: "#1e1e1e",
        marginBottom: 15,
    },
    picker: {
        height: 50,
        width: "100%",
        color: "#ffffff",
    },
    button: {
        backgroundColor: "#388e3c",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        width: "100%",
        marginTop: 10,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
});









// 🌞 Solar Calculator Workflow
// 1️⃣ User clicks the "Solar" icon → Navigates to SolarCalculatorScreen.tsx.
// 2️⃣ User enters inputs (Roof Area, Efficiency, Sunlight Hours).
// 3️⃣ User clicks "Calculate" → Data is sent to backend (solarApi.ts).
// 4️⃣ Backend processes the data and sends back the calculated results.
// 5️⃣ App navigates to SolarResultScreen.tsx to display the result.
// 6️⃣ User can click "Back" to return to the Solar Calculator screen.
// 7️⃣ Data is saved in the user’s database record for future access.