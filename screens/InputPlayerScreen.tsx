import React from "react";
import { Button, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./rootStats.ts";
import { screen } from "../enum/screen.ts";

type Props = NativeStackScreenProps<RootStackParamList, screen.InputPlayer>;

export const InputPlayerScreen = ({ navigation }: Props) => {
  return (
    <View>
      <View>
        <Text>Input Player</Text>
        <Button
          title={"Select"}
          onPress={() => {
            navigation.navigate(screen.Summary);
            navigation.reset({ routes: [{ name: screen.Summary }] });
          }}
        />
      </View>
    </View>
  );
};
