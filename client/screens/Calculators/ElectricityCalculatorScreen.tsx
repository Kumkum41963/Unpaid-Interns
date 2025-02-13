import { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ElectricityStackParamList } from "@/navigation/types";
import { calculateElectricity } from "@/api/electricityApi";
import { MaterialIcons } from "@expo/vector-icons"; // For cross (❌) delete button

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

    // List of available appliances
    const availableAppliances = [
        // Kitchen Appliances
        { label: "Fridge (Single Door)", value: "Fridge_SingleDoor", power: 150 },
        { label: "Fridge (Double Door)", value: "Fridge_DoubleDoor", power: 300 },
        { label: "Microwave", value: "Microwave", power: 1200 },
        { label: "Induction Cooktop", value: "InductionCooktop", power: 2000 },
        { label: "Toaster", value: "Toaster", power: 800 },
        { label: "Electric Kettle", value: "ElectricKettle", power: 1500 },
        { label: "Coffee Machine", value: "CoffeeMachine", power: 900 },
        { label: "Dishwasher", value: "Dishwasher", power: 1200 },
        { label: "Blender", value: "Blender", power: 400 },
    
        // Cooling & Ventilation
        { label: "AC (Window)", value: "AC_Window", power: 1800 },
        { label: "AC (Split)", value: "AC_Split", power: 2500 },
        { label: "Cooler", value: "Cooler", power: 200 },
        { label: "Ceiling Fan", value: "CeilingFan", power: 70 },
        { label: "Table Fan", value: "TableFan", power: 50 },
        { label: "Exhaust Fan", value: "ExhaustFan", power: 40 },
    
        // Heating & Water Appliances
        { label: "Room Heater", value: "RoomHeater", power: 1500 },
        { label: "Water Heater (Geyser)", value: "WaterHeater_Geyser", power: 2000 },
        { label: "Electric Blanket", value: "ElectricBlanket", power: 200 },
        { label: "Heat Lamp", value: "HeatLamp", power: 250 },
        { label: "Hair Dryer", value: "HairDryer", power: 1000 },
    
        // Lighting
        { label: "LED Bulb", value: "LED_Bulb", power: 10 },
        { label: "CFL Bulb", value: "CFL_Bulb", power: 20 },
        { label: "Incandescent Bulb", value: "IncandescentBulb", power: 60 },
        { label: "Tube Light", value: "TubeLight", power: 40 },
        { label: "Night Lamp", value: "NightLamp", power: 5 },
    
        // Entertainment & Electronics
        { label: "TV (LED)", value: "TV_LED", power: 100 },
        { label: "TV (OLED)", value: "TV_OLED", power: 200 },
        { label: "Gaming Console", value: "GamingConsole", power: 150 },
        { label: "Home Theater System", value: "HomeTheaterSystem", power: 300 },
        { label: "WiFi Router", value: "WiFiRouter", power: 15 },
        { label: "Laptop", value: "Laptop", power: 50 },
        { label: "Desktop", value: "Desktop", power: 200 },
        { label: "Printer", value: "Printer", power: 80 },
        { label: "Smart Speaker", value: "SmartSpeaker", power: 10 },
        { label: "CCTV Camera", value: "CCTV_Camera", power: 20 },
    
        // Washing & Cleaning
        { label: "Washing Machine (Top Load)", value: "WashingMachine_TopLoad", power: 500 },
        { label: "Washing Machine (Front Load)", value: "WashingMachine_FrontLoad", power: 800 },
        { label: "Vacuum Cleaner", value: "VacuumCleaner", power: 1200 },
        { label: "Clothes Iron", value: "ClothesIron", power: 1000 },
        { label: "Water Pump", value: "WaterPump", power: 750 },
    
        // Miscellaneous
        { label: "Electric Shaver", value: "ElectricShaver", power: 10 },
        { label: "Treadmill", value: "Treadmill", power: 1000 },
        { label: "Aquarium Pump", value: "AquariumPump", power: 30 },
    ];
    
    // Function to add an appliance entry
    const addAppliance = () => {
        if (!hoursUsed || !quantity) {
            Alert.alert("Error", "Please enter hours used and quantity.");
            return;
        }

        const newAppliance = {
            name: selectedAppliance,
            hours: Number(hoursUsed),
            quantity: Number(quantity),
        };

        setAppliances([...appliances, newAppliance]);

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
            let requestData: any = { method };
    
            if (method === "bill") {
                if (!billAmount) {
                    Alert.alert("Error", "Please enter the bill amount.");
                    setLoading(false);
                    return;
                }
    
                requestData = {
                    method: "bill",
                    billAmount: Number(billAmount) || 0,
                    state: state || "Unknown",
                    unitPrice: unitPrice ? Number(unitPrice) : 0, // Unit price is optional
                };
            } else if (method === "appliance") {
                if (appliances.length === 0) {
                    Alert.alert("Error", "Please add at least one appliance.");
                    setLoading(false);
                    return;
                }
    
                requestData = {
                    method: "appliance",
                    appliances: appliances.map(appliance => ({
                        name: appliance.name,
                        quantity: appliance.quantity,
                        hours: appliance.hours,
                        power: availableAppliances.find(a => a.value === appliance.name)?.power || 0,
                    })),
                };
            }
    
            console.log("📤 Sending Data to Backend:", JSON.stringify(requestData, null, 2)); // ✅ Debugging line
    
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
            console.error("❌ Error:", error);
            Alert.alert("Error", "Something went wrong!");
        }
    };
    

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Select Calculation Method</Text>
            <Picker selectedValue={method} onValueChange={(val) => setMethod(val as "bill" | "appliance")} style={styles.picker}>
                <Picker.Item label="Bill Based" value="bill" />
                <Picker.Item label="Appliance Based" value="appliance" />
            </Picker>

            {method === "bill" ? (
                <>
                    <Text style={styles.label}>Bill Amount (INR)</Text>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter bill amount" value={billAmount} onChangeText={setBillAmount} />

                    <Text style={styles.label}>State</Text>
                    <TextInput style={styles.input} placeholder="Enter state" value={state} onChangeText={setState} />

                    <Text style={styles.label}>Unit Price (INR/kWh) (Optional)</Text>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter unit price (optional)" value={unitPrice} onChangeText={setUnitPrice} />
                </>
            ) : (
                <>
                    <Text style={styles.label}>Select Appliance</Text>
                    <Picker selectedValue={selectedAppliance} onValueChange={setSelectedAppliance} style={styles.picker}>
                        {availableAppliances.map(appliance => (
                            <Picker.Item key={appliance.value} label={appliance.label} value={appliance.value} />
                        ))}
                    </Picker>

                    <Text style={styles.label}>Hours Used Per Day</Text>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter hours" value={hoursUsed} onChangeText={setHoursUsed} />

                    <Text style={styles.label}>Total Quantity</Text>
                    <TextInput style={styles.input} keyboardType="numeric" placeholder="Enter quantity" value={quantity} onChangeText={setQuantity} />

                    <Button title="Add Appliance" onPress={addAppliance} />

                    {appliances.length > 0 && (
                        <>
                            <Text style={styles.label}>Selected Appliances</Text>
                            {appliances.map((appliance, index) => (
                                <View key={index} style={styles.applianceItem}>
                                    <Text>{appliance.name} - {appliance.hours} hrs/day - {appliance.quantity} units</Text>
                                    <TouchableOpacity onPress={() => removeAppliance(index)}>
                                        <MaterialIcons name="close" size={24} color="red" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </>
                    )}
                </>
            )}

            {loading ? <ActivityIndicator size="large" color="#007BFF" /> : <Button title="Calculate" onPress={handleCalculate} />}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    input: { height: 40, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, paddingHorizontal: 10, marginBottom: 15 },
    picker: { height: 50, width: "100%" },
    applianceItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 10, backgroundColor: "#f8f8f8", marginTop: 10, borderRadius: 5 },
});




// ⚡ Electricity Calculator Workflow
// 1️⃣ User clicks the "Electricity" icon → Navigates to ElectricityCalculatorScreen.tsx.
// 2️⃣ User enters Monthly Usage (kWh) & Electricity Rate ($/kWh).
// 3️⃣ User clicks "Calculate" → Data is sent to backend (electricityApi.ts).
// 4️⃣ Backend computes estimated cost and returns the result.
// 5️⃣ App navigates to ElectricityResultScreen.tsx to show the result.
// 6️⃣ User clicks "Back" to return to the Electricity Calculator screen.
// 7️⃣ Data is saved in MongoDB for tracking electricity usage.