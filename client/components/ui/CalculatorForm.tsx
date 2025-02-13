import { useState } from "react";
import { View } from "react-native";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import { Picker } from "@react-native-picker/picker";

type InputType = {
    label: string;
    placeholder: string;
    key: string;
    type?: "text" | "dropdown";
    options?: string[]; // Dropdown options (if any)
    value?: string; // ✅ Support for controlled input values
    onChange?: (value: string) => void; // ✅ Support for input change
};

type FormProps = {
    inputs: InputType[];
    onSubmit: (data: any) => void;
    loading?: boolean;
};

export default function CalculatorForm({ inputs, onSubmit, loading = false }: FormProps) {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});

    const handleInputChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    return (
        <View>
            {inputs.map((input) => (
                <View key={input.key}>
                    {input.type === "dropdown" ? (
                        <Picker
                            selectedValue={input.value || formData[input.key] || input.options?.[0]}
                            onValueChange={(value) => {
                                handleInputChange(input.key, value);
                                input.onChange?.(value);
                            }}
                        >
                            {input.options?.map((option) => (
                                <Picker.Item key={option} label={option} value={option} />
                            ))}
                        </Picker>
                    ) : (
                        <InputField
                            label={input.label}
                            placeholder={input.placeholder}
                            value={input.value || formData[input.key] || ""}
                            onChange={(text) => {
                                handleInputChange(input.key, text);
                                input.onChange?.(text);
                            }}
                            keyboardType="numeric"
                        />
                    )}
                </View>
            ))}

            <Button title={loading ? "Calculating..." : "Calculate"} onPress={() => onSubmit(formData)} disabled={loading} />
        </View>
    );
}
