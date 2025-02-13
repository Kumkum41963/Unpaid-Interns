import { View, Text, StyleSheet } from "react-native";

type ResultProps = {
  title: string;
  data: { label: string; value: string | number }[];
};

export default function ResultCard({ title, data }: ResultProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {data.map((item, index) => (
        <Text key={index} style={styles.text}>
          {item.label}: {item.value}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, borderRadius: 8, backgroundColor: "#fff", elevation: 2, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  text: { fontSize: 16 },
});
