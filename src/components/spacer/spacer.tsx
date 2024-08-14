import { View } from "react-native";

export const Spacer = ({ height = 0, width = 0, children = null }) => {
  return <View style={{ width: width, height: height }}>{children}</View>;
};
