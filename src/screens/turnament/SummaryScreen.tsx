import React, { useEffect, useRef } from "react";
import { Button, StyleSheet, Text, Vibration, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../rootStats.ts";
import { screen } from "../../enum/screen.ts";
import { getCodeJoin, getPairNumber, saveCodeJoin } from "../../storage/tournament.ts";
import { Colors } from "../../styles/Colors.ts";
import { getServerURL, getToken } from "../../storage/login.ts";

type Props = NativeStackScreenProps<RootStackParamList, screen.Summary>;

export const SummaryScreen = ({ navigation,route }: Props) => {
  const [pairNumber, setPairNumber] = React.useState<number>(0);
  const [message, setMessage] = React.useState<string>("");
  const [webSocket, setWebSocket] = React.useState<WebSocket | null>(null);
  useEffect(() => {
    const initializeWebSocket = async () => {
      try {
        // Retrieve the URL from AsyncStorage
        const url = await getServerURL();
        const token = await getToken();
        const code = await getCodeJoin();
        const pairNumber = await getPairNumber();

        if (url) {
          // Initialize WebSocket with the retrieved URL
          const ws = new WebSocket(
            url + "api/ws/" + code + "/" + pairNumber,
            null,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          // Set up WebSocket event listeners
          ws.onopen = () => {
            console.log("WebSocket connection opened");
          };

          ws.onmessage = event => {
            console.log("Received message:", event.data);
            if (event.data === "vibrate") {
              Vibration.vibrate();
            }
            setMessage(event.data);
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
        <View style={style.messageBox}>
          <Text style={style.text}>{message}</Text>
        </View>
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
            saveCodeJoin({ code: "" });
            // navigation.navigate(screen.Home);
            route.params.exit();
            // navigation.reset({ routes: [{ name: screen.Home }] });
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
  messageBox: {
    margin: 5,
    backgroundColor: Colors.card,
  },
});
