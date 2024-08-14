import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./rootStats.ts";
import { screen } from "../enum/screen.ts";
import InputNumber from "../components/InputNumber";
import { Colors } from "../styles/Colors.ts";

type Props = NativeStackScreenProps<RootStackParamList, screen.InputPlayer>;

export const InputPlayerScreen = ({ navigation }: Props) => {
  const [section, setSection] = React.useState(1);
  const [table, setTable] = React.useState(1);
  const [round, setRound] = React.useState(1);
  return (
    <View style={style.base}>
      <View style={style.center}>
        <Text>section</Text>
        <InputNumber onChang={setSection} />
        <Text>table</Text>
        <InputNumber onChang={setTable} />
        <Text>round</Text>
        <InputNumber onChang={setRound} />
      </View>
      <Button
        title={"Select"}
        onPress={() => {
          navigation.navigate(screen.Summary);
          navigation.reset({ routes: [{ name: screen.Summary }] });
        }}
      />
      <Text>Section: {section}</Text>
      <Text>Table: {table}</Text>
      <Text>Round: {round}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  center: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  onWhite: {
    color: Colors.text,
  },
  base: {
    backgroundColor: Colors.background,
  }
});
