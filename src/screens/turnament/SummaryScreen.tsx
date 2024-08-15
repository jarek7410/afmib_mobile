import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../rootStats.ts";
import { screen } from "../../enum/screen.ts";
import { getPairNumber } from "../../storage/tournament.ts";
import { Colors } from "../../styles/Colors.ts";

type Props = NativeStackScreenProps<RootStackParamList, screen.Summary>;

export const SummaryScreen = ({ navigation }: Props) => {
  const [pairNumber, setPairNumber] = React.useState<number>(0);
  useEffect(() => {
    getPairNumber().then(pn => {
      if (pn != null) {
        setPairNumber(pn);
      }
    });
  }, []);
  return (
    <View>
      <View>
        <Text style={style.text}>Info receiver</Text>
        <Text style={style.text}>Pair number: {pairNumber}</Text>
        <Button
          title={"info reciveer"}
          onPress={() => {
            navigation.navigate(screen.InfoReceiver);
          }}
        />
        <Button
          title={"movement"}
          onPress={() => {
            navigation.navigate(screen.Movement);
          }}
        />
        <Button
          title={"input data"}
          onPress={() => {
            navigation.navigate(screen.InputData);
          }}
        />
        <Button
          title={"exit turnament"}
          onPress={() => {
            navigation.navigate(screen.Home);
            navigation.reset({ routes: [{ name: screen.Home }] });
          }}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  text: {
    fontSize: 20,
    color: Colors.text,
  },
});
