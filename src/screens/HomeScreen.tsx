import { SafeAreaView, ScrollView, View } from "react-native";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./rootStats.ts";
import { screen } from "../enum/screen.ts";
import Text from "../components/Text";
import Button from "../components/Button";
import { Colors } from "../styles/Colors.ts";
import { getMyObjects } from "../api/getMe.ts";
import { getCodeHistoryWithDates } from "../storage/history.ts";
import { codeWithDate } from "../storage/dto.ts";

type Props = NativeStackScreenProps<RootStackParamList, screen.Home>;

export const HomeScreen = ({ navigation }: Props) => {
  const [text, setText] = React.useState<string>("");
  const [codeHistory, setCodeHistory]
    = React.useState<codeWithDate[]>([]);
  useEffect(() => {
    getCodeHistoryWithDates().then(codes => {
      setCodeHistory(codes);
      console.log(codes);
    });
  }, []);
  useEffect(() => {
    getMyObjects().then(jsonValue => {
      if (jsonValue === undefined) {
        setText("error");
        return;
      }
      setText(jsonValue.toString());
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 ,
      alignContent: "center",
      backgroundColor: Colors.background,
      justifyContent: "center",}}>
        <ScrollView>
          {codeHistory.map((code, index) => (
            <View key={index}>
              <Text>{code.code}</Text>
              <Text>{code.date}</Text>
            </View>
          ))}
        </ScrollView>
      <View style={{
        alignItems: "center",
        justifyContent: "center",}}>
        <Text>{text}</Text>
        <Text>home</Text>
        <Button
          title={"join by code"}
          onPress={() => navigation.push(screen.CodeJoin)}
        />
      </View>
    </SafeAreaView>
  );
};
