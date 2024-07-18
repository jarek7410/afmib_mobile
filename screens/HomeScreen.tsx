import { SafeAreaView, View } from "react-native";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./rootStats.ts";
import { screen } from "../enum/screen.ts";
import { GetJWT, GetLoginData } from "../storage/login.ts";
import Text from "../components/Text/index.ts";
import Button from "../components/Button";
import { Colors } from "../styles/Colors.ts";

type Props = NativeStackScreenProps<RootStackParamList, screen.Home>;

export const HomeScreen = ({ navigation }: Props) => {
  const [text, setText] = React.useState<string>("");
  useEffect(() => {
    getMyObjects();
  }, []);
  const getMyObjects = async () => {
    try {
      const jsonValue = (await GetJWT()) + JSON.stringify(await GetLoginData());
      setText(jsonValue);
    } catch (e) {
      // read error
    }
    console.log("Done.");
  };

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
