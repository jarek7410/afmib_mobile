import { StyleSheet } from "react-native";
import { Colors } from "./Colors.ts";

export const style = StyleSheet.create({
  TextInput: {
    width: 200,
    color: Colors.text,
    borderStyle: "solid",
    borderColor: Colors.text,
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  centralizeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  horizontalContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
  },

});
