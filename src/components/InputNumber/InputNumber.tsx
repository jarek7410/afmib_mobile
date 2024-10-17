import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { Colors } from "../../styles/Colors.ts";
// import Text from '../Text/index.ts';
export const InputNumber = ({
  defaultNumber = 1,
  onChang = () => {},
  onlyPositive = true,
}: {
  defaultNumber?: number;
  onChang?: (number: number) => void;
  onlyPositive?: boolean;
}) => {
  const [value, setValue] = React.useState(defaultNumber);

  useEffect(() => {
    onChang(value);
  }, [value]);
  useEffect(() => {
    if (value < 0 && onlyPositive) {
      setValue(0);
    }
  }, [value]);
  const increment = () => {
    setValue(value + 1);
  };
  const decrement = () => {
    setValue(value - 1);
  };
  const moreIncrement = () => {
    setValue(value + 10);
  };
  const moreDecrement = () => {
    setValue(value - 10);
  };
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableHighlight
        onPress={decrement}
        onLongPress={moreDecrement}
        style={[style.button]}>
        <Text style={{ fontSize: 40, color: "black" }}>-</Text>
      </TouchableHighlight>
      <TextInput
        onChangeText={text => setValue(parseInt(text))}
        value={value.toString()}
        inputMode={"numeric"}
        style={[
          {
            width: 50,
            fontSize: 20,
            height: 50,
            textAlign: "center",
            borderWidth: 1,
            margin: 5,
            color: "black",
          },
        ]}
      />
      <TouchableHighlight
        onPress={increment}
        onLongPress={moreIncrement}
        style={[style.button]}>
        <Text style={{ fontSize: 40, color: "black" }}>+</Text>
      </TouchableHighlight>
    </View>
  );
};
export const style = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    margin: 5,
  },
});
