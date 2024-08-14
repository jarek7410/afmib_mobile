import { SafeAreaView, View } from "react-native";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./rootStats.ts";
import { screen } from "../enum/screen.ts";
import { getServerURL, getToken } from "../storage/login.ts";
import Text from "../components/Text";
import Button from "../components/Button";
import { Colors } from "../styles/Colors.ts";

type Props = NativeStackScreenProps<RootStackParamList, screen.Home>;

export const HomeScreen = ({ navigation }: Props) => {
  const [text, setText] = React.useState<string>("");
  useEffect(() => {
    const getMyObjects = async () => {
      try {
        const response = await fetch((await getServerURL()) + "api/me", {
          headers: {
            Authorization: "Bearer " + (await getToken()),
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          console.log("HomeScreen: getMyObjects: response not ok");
          return;
        }
        const jsonValue = await response.json();
        setText(JSON.stringify(jsonValue));
      } catch (e) {
        // read error
      }
      console.log("Done.");
    };
    getMyObjects();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          alignContent: "center",
          backgroundColor: Colors.background,
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
