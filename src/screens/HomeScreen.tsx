import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
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
  const [codeHistory, setCodeHistory] = React.useState<codeWithDate[]>([]);
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
      setText(
        jsonValue.pid +
          " " +
          jsonValue.name +
          " " +
          jsonValue.surname +
          " " +
          jsonValue.email +
          " " +
          jsonValue.username +
          " " +
          jsonValue.ID,
      );
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignContent: "center",
        backgroundColor: Colors.background,
        justifyContent: "center",
      }}>
      <ScrollView>
        {codeHistory.map((code, index) => {
          // const date =
          //   code.date.toDateString() + " " + code.date.toTimeString();
          return (
            <View style={style.card} key={index}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}>
                <View>
                  <Text>{code.code}</Text>
                  <Text>
                    {code.date.getFullYear() +
                      "." +
                      (code.date.getMonth() + 1) +
                      "." +
                      code.date.getDay() +
                      " " +
                      code.date.getHours() +
                      ":" +
                      code.date.getMinutes()}
                  </Text>
                </View>
                <Button
                  style={{ width: 100 }}
                  title={"rejoin"}
                  onPress={() => {}}
                />
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}>
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

const style = StyleSheet.create({
  card: {
    margin: 5,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
});
