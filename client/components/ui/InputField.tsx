import { View, Text, TextInput, StyleSheet } from "react-native";

type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  keyboardType?: "default" | "numeric";
};

export default function InputField({ label, placeholder, value, onChange, keyboardType = "default" }: InputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5 },
});
