import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../rootStats.ts";
import { screen } from "../../enum/screen.ts";
import React from "react";

type Props = NativeStackScreenProps<RootStackParamList, screen.Tournament>;

export const TurnamentNavigator = ({ navigation, route }: Props) => {
  return (
    <>

    </>
  );
};
