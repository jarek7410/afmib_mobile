import {
  ReturnKeyTypeOptions,
  StyleProp,
  TextInput,
  TextStyle,
} from "react-native";
import React from "react";
import { Colors } from "../../styles/Colors.ts";

type SignInUpTextInputProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  value: string;
  style?: StyleProp<TextStyle>;
  returnKeyType?: ReturnKeyTypeOptions;
  onSubmitEditing?: () => void;
  ref?: any;
  autoFocus?: boolean;
  blurOnSubmit?: boolean;
};

export const SignInUpTextInput = ({
  placeholder,
  onChangeText,
  secureTextEntry = false,
  value,
  returnKeyType,
  onSubmitEditing,
  ref,
  style = {},
  autoFocus = false,
  blurOnSubmit = false,
}: SignInUpTextInputProps) => {
  return (
    <TextInput
      style={[
        {
          width: 200,
          color: Colors.text,
          borderStyle: "solid",
          borderColor: Colors.text,
          borderWidth: 1,
          borderRadius: 10,
        },
        style,
      ]}
      // label={label}
      ref={ref}
      value={value}
      returnKeyType={returnKeyType}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      onSubmitEditing={onSubmitEditing}
      autoFocus={autoFocus}
      blurOnSubmit={blurOnSubmit}
    />
  );
};
