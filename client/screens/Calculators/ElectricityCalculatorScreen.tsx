import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import CalculatorForm from "@/components/CalculatorForm";
import { useRouter } from "expo-router";
import { calculateElectricity } from "@/api/electricityApi";

export default function ElectricityCalculatorScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (inputData: any) => {
    try {
      setLoading(true);
      const result = await calculateElectricity(inputData);
      setLoading(false);
      router.push({ pathname: "/electricity/result", params: { result: JSON.stringify(result) } });
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <View style={styles.container}>
      <CalculatorForm
        inputs={[
          { label: "Monthly Usage (kWh)", placeholder: "Enter kWh usage", key: "usage" },
          { label: "Electricity Rate ($/kWh)", placeholder: "Enter rate", key: "rate" },
        ]}
        onSubmit={handleCalculate}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 20 } });


// ⚡ Electricity Calculator Workflow
// 1️⃣ User clicks the "Electricity" icon → Navigates to ElectricityCalculatorScreen.tsx.
// 2️⃣ User enters Monthly Usage (kWh) & Electricity Rate ($/kWh).
// 3️⃣ User clicks "Calculate" → Data is sent to backend (electricityApi.ts).
// 4️⃣ Backend computes estimated cost and returns the result.
// 5️⃣ App navigates to ElectricityResultScreen.tsx to show the result.
// 6️⃣ User clicks "Back" to return to the Electricity Calculator screen.
// 7️⃣ Data is saved in MongoDB for tracking electricity usage.