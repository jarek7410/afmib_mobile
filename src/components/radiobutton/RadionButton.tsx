import { Pressable, StyleSheet, View } from "react-native";
import { Colors } from "../../styles/Colors.ts";
import React, { useEffect, useState } from "react";

export const RadionButton = ({
  children,
  onSelect,
  state,
  isSelected = false,
  style
}: {
  children: any;
  onSelect: (isSelected: boolean) => void;
  state?: boolean;
  isSelected?: boolean;
  style?: any;
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
        <View style={[styles.radion, style, styles.selected]}>{children}</View>
      )}
      {!isSelect && (
        <View style={[styles.radion, styles.deselected, style]}>
          {children}
        </View>
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  selected: {
    backgroundColor: Colors.primary,
  },
  deselected: {
    backgroundColor: Colors.deselect,
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
