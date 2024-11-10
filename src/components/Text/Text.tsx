import { StyleProp, Text as OldText, TextStyle } from "react-native";
import { Colors } from "../../styles/Colors.ts";

export const Text = ({ children, style }: { children?: any; style?: StyleProp<TextStyle> }) => {
  return (
    <OldText style={[{ color: Colors.text, fontWeight: 600 }, style]}>
      {children}
    </OldText>
  );
};
