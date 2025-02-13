import { View, StyleSheet, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ResultCard from "@/components/ui/ResultCard";

export default function ElectricityResultScreen() {
  const router = useRouter();
  const { result } = useLocalSearchParams();
  const data = result ? JSON.parse(result) : null;

  return (
    <View style={styles.container}>
      <ResultCard title="Electricity Usage Result" data={[
        { label: "Estimated Cost", value: `$${data?.cost}` }
      ]} />
      <Button title="Back to Calculator" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 20 } });
