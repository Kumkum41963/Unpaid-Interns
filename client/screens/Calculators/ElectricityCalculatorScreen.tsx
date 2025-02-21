import { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ElectricityStackParamList } from "@/navigation/types";
import { calculateElectricity } from "@/api/electricityApi";
import { MaterialIcons } from "@expo/vector-icons"; // For delete button (❌)
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define navigation type
type NavigationProps = StackNavigationProp<ElectricityStackParamList, "ElectricityCalculator">;

export default function ElectricityCalculatorScreen() {
    const navigation = useNavigation<NavigationProps>();
    
    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState<"bill" | "appliance">("bill");

    // Bill-based states
    const [billAmount, setBillAmount] = useState("");
    const [state, setState] = useState("");
    const [unitPrice, setUnitPrice] = useState("");

    // Appliance-based states
    const [appliances, setAppliances] = useState<{ name: string; hours: number; quantity: number }[]>([]);
    const [selectedAppliance, setSelectedAppliance] = useState("Fridge_SingleDoor");
    const [hoursUsed, setHoursUsed] = useState("");
    const [quantity, setQuantity] = useState("");

    // Function to add an appliance
    const addAppliance = () => {
        if (!hoursUsed || !quantity) {
            Alert.alert("Error", "Please enter hours used and quantity.");
            return;
        }

        setAppliances([...appliances, { name: selectedAppliance, hours: Number(hoursUsed), quantity: Number(quantity) }]);

        // Reset input fields
        setHoursUsed("");
        setQuantity("");
    };

    // Function to remove an appliance
    const removeAppliance = (index: number) => {
        setAppliances(appliances.filter((_, i) => i !== index));
    };

    const handleCalculate = async () => {
        try {
          setLoading(true);
          // const email = await AsyncStorage.getItem("userEmail"); // Get email from AsyncStorage
          const email = "a"; // Get email from AsyncStorage
          if (!email) {
            Alert.alert("Error", "User email not found. Please log in again.");
            setLoading(false);
            return;
          }
      
          let requestData: any = { method, email }; // Include email in the request data
      
          if (method === "bill") {
            if (!billAmount) {
              Alert.alert("Error", "Please enter the bill amount.");
              setLoading(false);
              return;
            }
            requestData = {
              ...requestData,
              billAmount: Number(billAmount) || 0,
              state: state || "Unknown",
              unitPrice: unitPrice ? Number(unitPrice) : 0,
            };
          } else if (method === "appliance") {
            if (appliances.length === 0) {
              Alert.alert("Error", "Please add at least one appliance.");
              setLoading(false);
              return;
            }
            requestData = { ...requestData, appliances };
          }
      
          console.log("Request Data:", requestData); // Log the request data
          const result = await calculateElectricity(requestData);
          setLoading(false);
          navigation.navigate("ElectricityResult", { result: JSON.stringify(result) });
      
          // Clear inputs after submission
          setBillAmount("");
          setState("");
          setUnitPrice("");
          setAppliances([]);
        } catch (error) {
          setLoading(false);
          Alert.alert("Error", "Something went wrong!");
        }
      };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Heading */}
            <Text style={styles.heading}>Electricity Consumption Calculator</Text>
            <Text style={styles.description}>
                Calculate your electricity usage and optimize your energy savings.
            </Text>

            <Text style={styles.label}>Select Calculation Method</Text>
            <Picker selectedValue={method} onValueChange={(val) => setMethod(val as "bill" | "appliance")} style={styles.picker}>
                <Picker.Item label="Bill Based" value="bill" />
                <Picker.Item label="Appliance Based" value="appliance" />
            </Picker>

            {method === "bill" ? (
                <>
                    <Text style={styles.label}>Bill Amount (INR)</Text>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter bill amount" value={billAmount} onChangeText={setBillAmount} placeholderTextColor="#888" />

                    <Text style={styles.label}>State</Text>
                    <TextInput style={styles.input} placeholder="Enter state" value={state} onChangeText={setState} placeholderTextColor="#888" />

                    <Text style={styles.label}>Unit Price (INR/kWh) (Optional)</Text>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter unit price (optional)" value={unitPrice} onChangeText={setUnitPrice} placeholderTextColor="#888" />
                </>
            ) : (
                <>
                    <Text style={styles.label}>Select Appliance</Text>
                    <Picker selectedValue={selectedAppliance} onValueChange={setSelectedAppliance} style={styles.picker}>
                        <Picker.Item label="Fridge (Single Door)" value="Fridge_SingleDoor" />
                        <Picker.Item label="AC (Split)" value="AC_Split" />
                        <Picker.Item label="Laptop" value="Laptop" />
                        {/* Add more options as needed */}
                    </Picker>

                    <Text style={styles.label}>Hours Used Per Day</Text>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter hours" value={hoursUsed} onChangeText={setHoursUsed} placeholderTextColor="#888" />

                    <Text style={styles.label}>Total Quantity</Text>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter quantity" value={quantity} onChangeText={setQuantity} placeholderTextColor="#888" />

                    <Button title="Add Appliance" onPress={addAppliance} />

                    {appliances.length > 0 && (
                        <>
                            <Text style={styles.label}>Selected Appliances</Text>
                            {appliances.map((appliance, index) => (
                                <View key={index} style={styles.applianceItem}>
                                    <Text style={styles.applianceText}>{appliance.name} - {appliance.hours} hrs/day - {appliance.quantity} units</Text>
                                    <TouchableOpacity onPress={() => removeAppliance(index)}>
                                        <MaterialIcons name="close" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </>
                    )}
                </>
            )}

            {loading ? <ActivityIndicator size="large" color="#a0e080" /> : <Button title="Calculate" onPress={handleCalculate} color="#388e3c" />}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 40, // Pushes content to the top
        backgroundColor: "#121212", // Dark theme
    },
    heading: {
        fontSize: 30, // Bigger heading for emphasis
        fontWeight: "bold",
        color: "#a0e080", // Green for eco-friendly look
        textAlign: "center",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: "#bbbbbb",
        textAlign: "center",
        marginBottom: 20,
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
    picker: {
        height: 50,
        width: "100%",
        color: "#ffffff",
        backgroundColor: "#1e1e1e",
    },
    applianceItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#1e1e1e",
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    applianceText: {
        color: "#ffffff",
    },
});






// ⚡ Electricity Calculator Workflow
// 1️⃣ User clicks the "Electricity" icon → Navigates to ElectricityCalculatorScreen.tsx.
// 2️⃣ User enters Monthly Usage (kWh) & Electricity Rate ($/kWh).
// 3️⃣ User clicks "Calculate" → Data is sent to backend (electricityApi.ts).
// 4️⃣ Backend computes estimated cost and returns the result.
// 5️⃣ App navigates to ElectricityResultScreen.tsx to show the result.
// 6️⃣ User clicks "Back" to return to the Electricity Calculator screen.
// 7️⃣ Data is saved in MongoDB for tracking electricity usage.