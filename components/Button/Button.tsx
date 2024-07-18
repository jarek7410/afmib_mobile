import { TouchableHighlight } from "react-native";
import { Colors } from "../../styles/Colors.ts";
import Text from "../Text";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { ViewStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import React from "react";

export const Button = ({
  children,
  onPress,
  title,
  style,
}: {
  children?: any;
  onPress?: () => void;
  title?: string;
  style?: { width: number };
}) => {
  if (title) {
    return (
      <TouchableHighlight onPress={onPress} style={[styles, style]}>
        {/*<View style={style}>*/}
        <Text>{title}</Text>
        {/*</View>*/}
      </TouchableHighlight>
    );
  }
  return (
    <TouchableHighlight onPress={onPress} style={[styles, style]}>
      {children}
    </TouchableHighlight>
  );
};

const styles: StyleProp<ViewStyle> = {
  backgroundColor: Colors.primary,
  padding: 5,
  borderRadius: 5,
  margin: 10,
  width: 200,
  justifyContent: "center",
  alignItems: "center",
};
