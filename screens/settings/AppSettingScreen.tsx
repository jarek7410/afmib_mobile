import React from "react";
import { Button, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../rootStats.ts";
import { screen } from "../../enum/screen.ts";
import { setLoginData } from "../../storage/login.ts";

type Props = NativeStackScreenProps<RootStackParamList, screen.Settings>;

export const AppSettingScreen = ({ navigation, route }: Props) => {
  return (
    <View>
      <View>
        <Text>input data</Text>
        <Button
          title={"go back"}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Button
          title={"logout"}
          onPress={() => {
            route.params.login();
            setLoginData({ jwt: "", name: "", email: "" });
          }}
        />
      </View>
    </View>
  );
};
