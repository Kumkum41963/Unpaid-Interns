import { useState } from "react";
import { View } from "react-native";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";

type FormProps = {
  inputs: { label: string; placeholder: string; key: string }[];
  onSubmit: (data: any) => void;
};

export default function CalculatorForm({ inputs, onSubmit }: FormProps) {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <View>
      {inputs.map((input) => (
        <InputField
          key={input.key}
          label={input.label}
          placeholder={input.placeholder}
          value={formData[input.key] || ""}
          onChange={(text) => handleInputChange(input.key, text)}
          keyboardType="numeric"
        />
      ))}
      <Button title="Calculate" onPress={() => onSubmit(formData)} />
    </View>
  );
}
