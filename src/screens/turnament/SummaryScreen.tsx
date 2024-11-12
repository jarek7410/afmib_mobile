import React, { useEffect } from "react";
import { StyleSheet, Text, Vibration, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../rootStats.ts";
import { screen } from "../../enum/screen.ts";
import {
  getCodeJoin,
  getPairNumber,
  getTournament,
  saveCodeJoin,
} from "../../storage/tournament.ts";
import { Colors } from "../../styles/Colors.ts";
import Button from "../../components/Button";
import { getServerURL } from "../../storage/login.ts";
import { messageWS, tournamentDTO } from "../../storage/dto.ts";
import { setNewestMessage } from "../../storage/messages.ts";
import { EventRegister } from "react-native-event-listeners";
import { useTranslation } from "react-i18next";
import { retrivePairNumber } from "../../api/retrivePairNumber.ts";

type Props = NativeStackScreenProps<RootStackParamList, screen.Summary>;

export const SummaryScreen = ({ navigation, route }: Props) => {
  const { t } = useTranslation();
  const [pairNumber, setPairNumber] = React.useState<number>(0);
  const [message, setMessage] = React.useState<string>("");
  const [webSocket, setWebSocket] = React.useState<WebSocket | null>(null);
  const [torurnament, setTournament] = React.useState<tournamentDTO>({
    ID: 0,
    code_id: 0,
    creator_id: 0,
    name: "",
  });
  EventRegister.addEventListener("pairNumberRetrive", pairNumber => {
    setPairNumber(pairNumber);
  });

  useEffect(() => {
    const initializeWebSocket = async () => {
      try {
        // Retrieve the URL from AsyncStorage
        const url = await getServerURL();
        // const token = await getToken();
        const code = await getCodeJoin();
        const pairNumber = await getPairNumber();

        if (url) {
          // Initialize WebSocket with the retrieved URL
          const ws = new WebSocket(
            url + "api/view/ws/" + code + "/" + pairNumber,
            null,
            // {
            //   headers: { Authorization: `Bearer ${token}` },
            // },
          );

          // Set up WebSocket event listeners
          ws.onopen = () => {
            console.log("WebSocket connection opened");
          };

          ws.onmessage = event => {
            const data: messageWS = JSON.parse(event.data);
            console.log("Received message:", typeof event.data);
            if (data.type === "vibrate") {
              Vibration.vibrate();
            }
            if (data.type === "settings") {
              EventRegister.emit("settings", data);
            }
            // console.log("ws", data.message, data.message.length !== 0);
            console.log(data);
            if (data.message.length !== 0) {
              setMessage(data.message);
            }
            setNewestMessage(data);
          };

          ws.onerror = error => {
            console.error("WebSocket error:", error);
          };

          ws.onclose = () => {
            console.log("WebSocket connection closed");
          };

          // Save the WebSocket instance to state
          setWebSocket(ws);
        } else {
          console.error("No URL found in AsyncStorage");
        }
      } catch (error) {
        console.error("Failed to retrieve URL from AsyncStorage:", error);
      }
    };
    initializeWebSocket();
    return () => {
      // Close the WebSocket connection when the component unmounts
      if (webSocket) {
        console.log("Closing WebSocket connection");
        webSocket.close();
      }
    };
  }, []);
  useEffect(() => {
    getTournament().then(t => {
      if (t != null) {
        setTournament(t);
      }
    });
  }, []);
  useEffect(() => {
    getPairNumber().then(pn => {
      if (pn == null) {
        return;
      }
      if (pn == 0) {
        retrivePairNumber();
      }
      setPairNumber(pn);
    });
  }, []);
  return (
    <View>
      <View style={{ alignItems: "center" }}>
        <Text style={style.text}>{torurnament.name}</Text>
        <Text style={style.text}>Pair number: {pairNumber}</Text>
        {/*<View style={style.messageBox}>*/}
        {/*  <Text style={style.text}>{message}</Text>*/}
        {/*</View>*/}
        {/*<Button*/}
        {/*  title={t("infoReciveer")}*/}
        {/*  onPress={() => {*/}
        {/*    navigation.navigate(screen.InfoReceiver);*/}
        {/*  }}*/}
        {/*/>*/}
        <Button
          title={t("AddPlaydBoard")}
          onPress={() => {
            navigation.navigate("InputReceiveData");
          }}
        />
        <Button
          title={t("movement")}
          onPress={() => {
            navigation.navigate(screen.Movement);
          }}
        />
        <Button
          title={t("playersNames")}
          onPress={() => {
            navigation.navigate(screen.InputData);
          }}
        />
        <Button
          title={t("tournamentProgress")}
          onPress={() => {
            navigation.navigate("TournamentProgress");
          }}
        />
        <Button
          title={t("exitTournament")}
          onPress={() => {
            saveCodeJoin({ code: "" });
            // navigation.navigate(screen.Home);
            route.params.exit();
            // navigation.reset({ routes: [{ name: screen.Home }] });
          }}
        />
      </View>
      {/*<Button title={t("submit")} onPress={()=>{}}/>*/}
    </View>
  );
};
const style = StyleSheet.create({
  text: {
    fontSize: 20,
    color: Colors.text,
  },
  messageBox: {
    margin: 5,
    backgroundColor: Colors.card,
  },
});
