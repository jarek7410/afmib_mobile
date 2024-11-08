import { StyleSheet, TouchableHighlight } from "react-native";
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
  disabled,
}: {
  children?: any;
  onPress?: () => void;
  title?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}) => {
  if (title) {
    return (
      <TouchableHighlight onPress={onPress} style={[styles.button, style]} disabled={disabled}>
        {/*<View style={style}>*/}
        <Text>{title}</Text>
        {/*</View>*/}
      </TouchableHighlight>
    );
  }
  return (
    <TouchableHighlight onPress={onPress} style={[styles.button, style]} disabled={disabled}>
      {children}
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 5,
    margin: 10,
    width: 200,
    borderBottomWidth:5,
    borderRightWidth:5,
    borderCurve: "continuous",
    borderColor: Colors.shadow,
    justifyContent: "center",
    alignItems: "center",
  },
});
