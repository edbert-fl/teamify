import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { theme } from "../utils/Styles";

interface FormInputProps {
  label: string;
  value: string;
  setValue: (value: string) => {};
  autoCaps?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ label, value, setValue, autoCaps = true }) => {
  return (
    <TextInput
      value={value}
      style={styles.input}
      placeholder={label}
      placeholderTextColor={theme.colors.primary}
      autoCapitalize={autoCaps ? "words" : "none"}
      onChangeText={(text) => setValue(text)}
      enablesReturnKeyAutomatically
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    borderBottomWidth: 2,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    height: 50,
    padding: 10,
    backgroundColor: "transparent",
  },
});

export default FormInput;
