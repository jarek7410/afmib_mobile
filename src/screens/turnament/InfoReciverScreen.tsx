import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../rootStats.ts";
import { screen } from "../../enum/screen.ts";
import { messageForHistory } from "../../storage/dto.ts";
import { getMessageHistory } from "../../storage/history.ts";
import { Colors } from "../../styles/Colors.ts";

type Props = NativeStackScreenProps<RootStackParamList, screen.InfoReceiver>;

export const InfoReceiverScreen = ({ navigation }: Props) => {
  const [messages, setMessages] = useState<messageForHistory[]>([]);
  useEffect(() => {
    getMessageHistory().then(messages => {
      setMessages(messages);
    });
  }, []);
  return (
    <View>
      <View>
        <ScrollView>
          {messages &&
            messages
              .sort((a, b) => {
                if (a.date < b.date) {
                  return -1;
                }
                if (a.date > b.date) {
                  return 1;
                }
                return 0;
              })
              .map((mov, index) => {
                const date = new Date(mov.date);
                return (
                  <View style={style.card} key={index}>
                    <View
                      style={[
                        style.horizontal,
                        {
                          justifyContent: "space-between",
                        },
                      ]}>
                      <Text style={style.text}>
                        time: {date.getHours()}:{date.getMinutes()}:
                        {date.getSeconds()}
                      </Text>
                      <Text style={style.text}>
                        {mov.ID.slice(0, 8)}
                      </Text>
                    </View>

                    <View style={style.horizontal}>
                      <View style={style.cardText}>
                        {mov.message && (
                          <Text style={style.text}>message: {mov.message}</Text>
                        )}
                        <Text style={style.text}>type: {mov.type}</Text>
                      </View>
                    </View>
                  </View>
                );
              })}
        </ScrollView>
      </View>
    </View>
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
    flex: 1,
  },
});
