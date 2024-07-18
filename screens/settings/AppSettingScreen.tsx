import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../rootStats.ts";
import { screen } from "../../enum/screen.ts";
import { setLoginData } from "../../storage/login.ts";
import Button from "../../components/Button";

type Props = NativeStackScreenProps<RootStackParamList, screen.Settings>;

export const AppSettingScreen = ({ route }: Props) => {
  return (
    <View>
      <View>
        <Button
          title={"logout"}
          onPress={() => {
            route.params.logout();
            setLoginData({ token: "", name: "", email: "" }).then(() => {
              console.log("logout");
            });
          }}
        />
      </View>
    </View>
  );
};
