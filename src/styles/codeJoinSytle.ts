import { StyleSheet } from "react-native";
import { Colors } from "./Colors.ts";

export const style = StyleSheet.create({
  TextInput: {
    width: 30,
    color: Colors.text,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: Colors.text,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    fontSize: 20,
  },
});
