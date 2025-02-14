import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ButtonProps = {
    title: string;
    onPress: () => void;
    disabled?: boolean; // ✅ Add support for the disabled prop
};

export default function Button({ title, onPress, disabled = false }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabledButton]}
            onPress={!disabled ? onPress : undefined} // ✅ Prevent action when disabled
            activeOpacity={disabled ? 1 : 0.7}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#388e3c", // Green for active button
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: "#666", // Gray for disabled button
    },
    text: {
        color: "#ffffff", // White text for better contrast
        fontSize: 16,
        fontWeight: "bold",
    },
});
