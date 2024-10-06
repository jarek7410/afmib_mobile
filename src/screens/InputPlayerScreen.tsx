import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./rootStats.ts";
import { screen } from "../enum/screen.ts";
import InputNumber from "../components/InputNumber";
import { Colors } from "../styles/Colors.ts";
import RadionButton from "../components/radiobutton";
import {
  savePairNumber,
  saveTableJoin,
  saveTournament,
} from "../storage/tournament.ts";
import Button from "../components/Button";
import { joinTournament } from "../api/joinTournament.ts";
import { getPair } from "../api/getPair.ts";
import { settings } from "../storage/dto.ts";
import { getSettings } from "../storage/settings.ts";
import { useTranslation } from "react-i18next";

type Props = NativeStackScreenProps<RootStackParamList, screen.InputPlayer>;

export const InputPlayerScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const [section, setSection] = React.useState(1);
  const [table, setTable] = React.useState(1);
  const [round, setRound] = React.useState(1);
  const [isNS, setIsNS] = React.useState(true);
  const [settings, setSettings] = useState<settings>({
    chooseSector: false,
    defaultSector: 1,
    helloMessage: "hello",
    pairJoin: false,
    singeJoin: false,
    tableJoin: false,
  });
  useEffect(() => {
    getSettings().then(sett => {
      if (sett == null) {
        return;
      }
      setSettings(sett);
    });
  }, []);
  return (
    <SafeAreaView
      style={[style.base, { justifyContent: "center", alignItems: "center" }]}>
      <View style={[style.center]}>
        <View style={style.horizontal}>
          <View style={{ justifyContent: "space-around" }}>
            {settings.chooseSector && <Text style={style.text}>section:</Text>}
            <Text style={style.text}>table:</Text>
            <Text style={style.text}>round:</Text>
          </View>
          <View>
            {settings.chooseSector && <InputNumber onChang={setSection} />}
            <InputNumber onChang={setTable} />
            <InputNumber onChang={setRound} />
          </View>
        </View>
        <Text>NS/EW:</Text>
        <View style={style.horizontal}>
          {isNS && (
            <RadionButton onSelect={() => setIsNS(!isNS)} state={isNS}>
              <Text>NS</Text>
            </RadionButton>
          )}
          {!isNS && (
            <RadionButton onSelect={() => setIsNS(!isNS)} state={!isNS}>
              <Text>EW</Text>
            </RadionButton>
          )}
        </View>
      </View>
      <Button
        title={t("confirm")}
        onPress={() => {
          //TODO: to much to do in ui
          joinTournament().then(tourn => {
            saveTournament(tourn);
          });
          saveTableJoin({ section, table, round, is_ns: isNS }).then(() => {
            getPair().then(pair => {
              // console.log("pair: ", pair);
              savePairNumber(pair);
              // navigation.navigate(screen.Summary);
              route.params.join();
              navigation.reset({ routes: [{ name: screen.Summary }] });
            });
          });
        }}
      />
      <Text>Section: {section}</Text>
      <Text>Table: {table}</Text>
      <Text>Round: {round}</Text>
      <Text>isNS: {isNS ? "tak" : "nie"}</Text>
    </SafeAreaView>
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
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    height: 50,
    margin: 5,
    color: "black",
    // backgroundColor: "violet",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
  },
});
