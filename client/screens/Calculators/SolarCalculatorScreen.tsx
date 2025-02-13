import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import CalculatorForm from "@/components/ui/CalculatorForm";
import { useRouter } from "expo-router";
import { calculateSolarEnergy } from "@/api/solarApi";

export default function SolarCalculatorScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (inputData: any) => {
    try {
      setLoading(true);
      const result = await calculateSolarEnergy(inputData);
      setLoading(false);
      router.push({ pathname: "/solar/result", params: { result: JSON.stringify(result) } });
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <View style={styles.container}>
      <CalculatorForm
        inputs={[
          { label: "Roof Area (sq ft)", placeholder: "Enter roof area", key: "area" },
          { label: "Panel Efficiency (%)", placeholder: "Enter efficiency", key: "efficiency" },
          { label: "Sunlight Hours", placeholder: "Enter sunlight hrs", key: "sunlight" },
        ]}
        onSubmit={handleCalculate}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 20 } });



// 🌞 Solar Calculator Workflow
// 1️⃣ User clicks the "Solar" icon → Navigates to SolarCalculatorScreen.tsx.
// 2️⃣ User enters inputs (Roof Area, Efficiency, Sunlight Hours).
// 3️⃣ User clicks "Calculate" → Data is sent to backend (solarApi.ts).
// 4️⃣ Backend processes the data and sends back the calculated results.
// 5️⃣ App navigates to SolarResultScreen.tsx to display the result.
// 6️⃣ User can click "Back" to return to the Solar Calculator screen.
// 7️⃣ Data is saved in the user’s database record for future access.