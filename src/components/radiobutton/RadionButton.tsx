import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../../styles/Colors.ts";
import React, { useEffect, useState } from "react";

export const RadionButton = ({
  children,
  onSelect,
  state,
  isSelected = false,
}: {
  children: any;
  onSelect: (isSelected: boolean) => void;
  state?: boolean;
  isSelected?: boolean;
}) => {
  const [isSelect, setIsSelect] = useState(isSelected);
  useEffect(() => {
    if (state === undefined) {
      return;
    }
    setIsSelect(state);
  }, [state]);
  return (
    <Pressable
      onPress={() => {
        setIsSelect(!isSelect);
        onSelect(!isSelect);
      }}>
      {isSelect && (
        <View style={[style.radion, style.selected]}>{children}</View>
      )}
      {!isSelect && (
        <View style={[style.radion, style.deselected]}>{children}</View>
      )}
    </Pressable>
  );
};
const style = StyleSheet.create({
  selected: {
    backgroundColor: Colors.primary,
  },
  deselected: {
    backgroundColor: Colors.background,
  },
  radion: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
