import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../rootStats.ts";
import { ScrollView, View } from "react-native";
import Text from "../../components/Text";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { PairStat, TableStat } from "../../storage/dto.ts";
import { getCurrentRoundData } from "../../api/getCurrentRoundData.ts";
import { style } from "../../styles/loginRegisterStyle.ts";
import { Colors } from "../../styles/Colors.ts";
import { getCurrentRoundTables } from "../../api/getCurrentRoundTables.ts";

type Props = NativeStackScreenProps<RootStackParamList, "TournamentProgress">;

export const TournamentProgressScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const [round, setRound] = useState<[PairStat]>([]);
  const [roundTable, setRoundTable] = useState<Map<number, [TableStat]>>(
    new Map([]),
  );
  // const [tableMax, setTableMax] = useState<number>(0);
  // const [roundMax, setRoundMax] = useState<number>(0);
  useEffect(() => {
    getCurrentRoundData().then(data => {
      setRound(data);
    });
  }, []);
  useEffect(() => {
    getCurrentRoundTables().then(data => {
      let m = new Map<number, [TableStat]>();
      for (const d of data) {
        let ts = m.get(d.Table);
        if (ts === undefined) {
          ts = [d];
        } else {
          ts.push(d);
        }
        m.set(d.Table, ts);
      }
      setRoundTable(m);
    });
  }, []);
  return (
    <ScrollView style={{ width: "100%", backgroundColor: Colors.background }}>
      <ScrollView horizontal={true}>
        <View style={{ alignItems: "flex-start" }}>
          {round.map((item, index) => (
            <View key={index} style={style.rowCare}>
              <View style={[style.horCare, { marginRight: 15 }]}>
                <Text>pair: {item.Pair}</Text>
              </View>
              <View
                style={[
                  style.rowCare,
                  { justifyContent: "flex-start", alignItems: "flex-start" },
                ]}>
                {[...Array(item.Round)].map((_, i) => (
                  <View
                    style={[
                      style.centralizeContainer,
                      style.roundBox,
                      { backgroundColor: Colors.ready },
                    ]}>
                    <Text key={i + 1}>{i + 1}: all</Text>
                  </View>
                ))}
                <View
                  style={[
                    style.centralizeContainer,
                    style.roundBox,
                    {
                      backgroundColor: Colors.inProgress,
                      width: 50,
                      paddingRight: 0,
                    },
                  ]}>
                  <Text>{item.Round}:</Text>
                  <Text>{item.BoardsNotPlayed.sort().join(",")}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <ScrollView horizontal={true}>
        <View>
          {Array.from(roundTable).map(([key, value]) => {
            return (
              <View style={[style.rowCare]}>
                <View style={[style.horCare, { marginRight: 15 }]}>
                  <Text>table: {key}</Text>
                </View>
                {value.map((value, index) => {
                  return (
                    <View
                      key={index}
                      style={[
                        style.centralizeContainer,
                        // style.roundBox,
                        {
                          backgroundColor:
                            value.BoardsNotPlayed.toString() !== ""
                              ? value.BoardsNotPlayed.sort().toString() !==
                                value.BoardsAll.sort().toString()
                                ? Colors.inProgress
                                : Colors.card
                              : Colors.ready,
                          // width: 50,
                          borderLeftWidth: 1,
                        },
                      ]}>
                      {/*<Text>{value.Round}</Text>*/}
                      <View style={{ flexDirection: "row" }}>
                        {value.BoardsPlayed.toString() !== "" &&
                          value.BoardsPlayed.sort().map(num => {
                            return (
                              <View
                                style={[
                                  style.centralizeContainer,
                                  {
                                    backgroundColor: Colors.ready,
                                    marginHorizontal: 1,
                                    borderRadius: 5,
                                    width: 20,
                                    height: 20,
                                  },
                                ]}>
                                <Text>{num}</Text>
                              </View>
                            );
                          })}
                        {value.BoardsNotPlayed.toString() !== "" &&
                          value.BoardsNotPlayed.sort().map(num => {
                            return (
                              <View
                                style={[
                                  style.centralizeContainer,
                                  {
                                    backgroundColor: "#00000000",
                                    marginHorizontal: 1,
                                    borderRadius: 5,
                                    width: 20,
                                    height: 20,
                                  },
                                ]}>
                                <Text>{num}</Text>
                              </View>
                            );
                          })}
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ScrollView>
  );
};
