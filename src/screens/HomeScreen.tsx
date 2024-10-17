import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./rootStats.ts";
import { screen } from "../enum/screen.ts";
import Text from "../components/Text";
import Button from "../components/Button";
import { Colors } from "../styles/Colors.ts";
import { getCodeHistoryWithDates } from "../storage/history.ts";
import { codeWithDate } from "../storage/dto.ts";
import { saveCodeJoin } from "../storage/tournament.ts";
import { getMyData } from "../storage/mydata.ts";
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomeScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const [text, setText] = React.useState<string>("");
  const [codeHistory, setCodeHistory] = React.useState<codeWithDate[]>([]);
  useEffect(() => {
    getCodeHistoryWithDates().then(codes => {
      setCodeHistory(codes);
      console.log(codes);
    });
  }, []);
  useEffect(() => {
    getMyData().then(jsonValue => {
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
        {codeHistory
          .sort((a, b) => {
            if (a.date < b.date) {
              return 1;
            }
            if (a.date > b.date) {
              return -1;
            }
            return 0;
          })
          .map((code, index) => {
            // const date =
            //   code.date.toDateString() + " " + code.date.toTimeString();
            return (
              <View style={style.card} key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  <View>
                    <Text>
                      {code.date.getFullYear() +
                        "." +
                        (code.date.getMonth() + 1) +
                        "." +
                        (code.date.getDay() + 1) +
                        " " +
                        code.date.getHours() +
                        ":" +
                        code.date.getMinutes()}
                    </Text>
                    <Text>
                      {t("code")}
                      {code.code}
                    </Text>
                  </View>
                  <Button
                    style={{ width: 100 }}
                    title={t("rejoin")}
                    onPress={() => {
                      saveCodeJoin({ code: code.code });
                      navigation.navigate("InputPlayer");
                    }}
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
        {/*<Text>home</Text>*/}
        <Button
          title={t("joinBycode")}
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
    // borderWidth: 1,
    backgroundColor: Colors.card,
  },
});
