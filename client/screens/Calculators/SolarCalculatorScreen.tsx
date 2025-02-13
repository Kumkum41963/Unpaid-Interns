import { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from "react-native";
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
            setPanelType("Monocrystalline"); // Reset dropdown to default value
        } catch (error) {
            setLoading(false);
            Alert.alert("Error", "Something went wrong!");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>State</Text>
            <TextInput
                value={state}
                onChangeText={setState}
                placeholder="Enter state"
                keyboardType="default"
                autoCapitalize="words"
                style={styles.input}
            />

            <Text style={styles.label}>Country</Text>
            <TextInput
                value={country}
                onChangeText={setCountry}
                placeholder="Enter country"
                keyboardType="default"
                autoCapitalize="words"
                style={styles.input}
            />

            <Text style={styles.label}>Rooftop Area (sq ft)</Text>
            <TextInput
                value={rooftopArea}
                onChangeText={setRooftopArea}
                placeholder="Enter area"
                keyboardType="numeric"
                style={styles.input}
            />

            <Text style={styles.label}>Panel Type</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={panelType}
                    onValueChange={(itemValue) => setPanelType(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Monocrystalline" value="Monocrystalline" />
                    <Picker.Item label="Polycrystalline" value="Polycrystalline" />
                    <Picker.Item label="Thin-Film" value="Thin-Film" />
                </Picker>
            </View>


            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <Button title="Calculate" onPress={handleCalculate} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 15,
        overflow: "hidden",
    },
    picker: {
        height: 50,
        width: "100%",
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