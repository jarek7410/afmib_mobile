import { StyleSheet } from "react-native";
import { Colors } from "./Colors.ts";

export const style = StyleSheet.create({
  TextInput: {
    width: 200,
    color: Colors.text,
    borderStyle: "solid",
    borderColor: Colors.text,
    // borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    backgroundColor: Colors.primary,
  },
  centralizeContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  horizontalContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    color: Colors.text,
  },
  rowCare: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.card,
    justifyContent: "center",
    margin: 3,
    borderRadius: 8,
  },
  horCare: {
    // flexWrap: "wrap",
    backgroundColor: Colors.card,
    justifyContent: "center",
    margin: 5,
  },
  roundBox: {
    height: 50,
    width: 65,
    // paddingRight: 15,
    marginLeft: -10,
    borderRadius: 7,
  },
});
