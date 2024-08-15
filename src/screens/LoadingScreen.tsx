import { View } from "react-native";
import React, { useEffect } from "react";
import Text from "../components/Text";

// type Props = NativeStackScreenProps<RootStackParamList, screen.Loading>;
export const LoadingScreen = () => {
  useEffect(() => {}, []);
  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>Loading...</Text>
      </View>
    </View>
  );
};
