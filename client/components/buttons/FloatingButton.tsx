import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FloatingButtonProps {
    onPress: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 30,
        left: "50%",
        marginLeft: -30,
        backgroundColor: "#0B5D1E",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});

export default FloatingButton;


