import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../rootStats.ts";
import { screen } from "../../enum/screen.ts";
import { movementDTO } from "../../storage/dto.ts";
import { Colors } from "../../styles/Colors.ts";
import { getMovementData, saveMovementData } from "../../storage/tournament.ts";

type Props = NativeStackScreenProps<RootStackParamList, screen.Movement>;

export const MovementScreen = ({}: Props) => {
  const [movement, setMovement] = React.useState<movementDTO[]>([]);
  useEffect(() => {
    getMovementData().then(mov => {
      saveMovementData(mov).then(() => {
        getMovementData().then(mov => {
          setMovement(mov);
        });
      });
    });
  }, []);
  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        {movement &&
          movement
            .sort((a, b) => {
              if (a.section < b.section) {
                return -1;
              }
              if (a.section > b.section) {
                return 1;
              }
              if (a.round < b.round) {
                return -1;
              }
              if (a.round > b.round) {
                return 1;
              }
              //this should not happen
              if (a.table < b.table) {
                return -1;
              }
              if (a.table > b.table) {
                return 1;
              }
              return 0;
            })
            .map((mov, index) => {
              return (
                <View style={style.card} key={index}>
                  <View style={style.horizontal}>
                    <View style={style.cardText}>
                      <Text style={style.text}>section: {mov.section}</Text>
                      <Text style={style.text}>round: {mov.round}</Text>
                      <Text style={style.text}>table: {mov.table}</Text>
                    </View>
                    <View style={style.cardText}>
                      <Text style={style.text}>
                        board: {mov.lowBoard}-{mov.highBoard}
                      </Text>
                      <Text style={style.text}>
                        pairs: NS-{mov.nsPair} vs EW-{mov.ewPair}
                      </Text>
                    </View>
                  </View>
                  <Text style={style.text}>{mov.UpdatedAt}</Text>
                </View>
              );
            })}
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  text: {
    fontSize: 17,
    color: Colors.text,
  },
  card: {
    margin: 5,
    padding: 3,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: Colors.card,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  horizontal: {
    flexDirection: "row",
  },
  cardText: {
    padding: 10,
    margin: 3,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: Colors.cardPart,
  },
});
