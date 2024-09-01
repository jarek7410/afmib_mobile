import { useMagicModal } from "react-native-magic-modal";
import { Pressable, StyleSheet, View } from "react-native";
import Text from "../Text";
import React from "react";

export const QuickModal = ({ text }: { text: string }) => {
  const { hide } = useMagicModal<string>();
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Pressable onPress={() => hide("close")} style={styles.buttonContainer}>
        <Text>Close Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    backgroundColor: "#f0f0f0",
    margin: 20,
    paddingHorizontal: 25,
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  body: {
    textAlign: "center",
    fontSize: 14,
  },
  buttonContainer: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 25,
    backgroundColor: "#fab54d",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
