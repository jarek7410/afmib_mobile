import { StyleSheet } from "react-native";
import { Colors } from "./Colors.ts";

export const LoginRegisterStyle = StyleSheet.create({
  TextInput: {
    width: 200,
    color: Colors.text,
    borderStyle: "solid",
    borderColor: Colors.text,
    borderWidth: 1,
    borderRadius: 10,
  },
});
