import { View, StyleSheet, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ResultCard from "@/components/ui/ResultCard";

export default function SolarResultScreen() {
  const router = useRouter();
  const { result } = useLocalSearchParams();
  const data = result ? JSON.parse(result) : null;

  return (
    <View style={styles.container}>
      <ResultCard title="Solar Energy Result" data={[
        { label: "Estimated Power", value: `${data?.power} kWh` },
        { label: "CO₂ Saved", value: `${data?.co2} kg` }
      ]} />
      <Button title="Back to Calculator" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 20 } });
