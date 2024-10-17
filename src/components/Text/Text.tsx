import { Text as OldText } from "react-native";
import { Colors } from "../../styles/Colors.ts";

export const Text = ({ children }: { children?: any }) => {
  return (
    <OldText style={{ color: Colors.text, fontWeight: 600 }}>
      {children}
    </OldText>
  );
};
