import React, { useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { RootStackParamList } from "./rootStats.ts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { screen } from "../enum/screen.ts";
import { style } from "../styles/codeJoinSytle.ts";
import { saveCodeJoin } from "../storage/codeJoin.ts";

type Props = NativeStackScreenProps<RootStackParamList, screen.CodeJoin>;

export const CodeJoinScreen = ({ navigation }: Props) => {
  const code1Input = React.useRef<TextInput>(null);
  const code2Input = React.useRef<TextInput>(null);
  const code3Input = React.useRef<TextInput>(null);
  const code4Input = React.useRef<TextInput>(null);
  const code5Input = React.useRef<TextInput>(null);
  const code6Input = React.useRef<TextInput>(null);
  const code7Input = React.useRef<TextInput>(null);
  const code8Input = React.useRef<TextInput>(null);
  const [code, setCode] = React.useState<string>("");
  const [code1, setCode1] = React.useState<string>("");
  const [code2, setCode2] = React.useState<string>("");
  const [code3, setCode3] = React.useState<string>("");
  const [code4, setCode4] = React.useState<string>("");
  const [code5, setCode5] = React.useState<string>("");
  const [code6, setCode6] = React.useState<string>("");
  const [code7, setCode7] = React.useState<string>("");
  const [code8, setCode8] = React.useState<string>("");
  useEffect(() => {
    setCode(
      codeFragmentAction(code1, setCode1, code2Input.current, setCode2) +
        codeFragmentAction(code2, setCode2, code3Input.current, setCode3) +
        codeFragmentAction(code3, setCode3, code4Input.current, setCode4) +
        codeFragmentAction(code4, setCode4, code5Input.current, setCode5) +
        codeFragmentAction(code5, setCode5, code6Input.current, setCode6) +
        codeFragmentAction(code6, setCode6, code7Input.current, setCode7) +
        codeFragmentAction(code7, setCode7, code8Input.current, setCode8) +
        codeFragmentAction(code8, setCode8),
    );
  }, [code1, code2, code3, code4, code5, code6, code7, code8]);
  const codeFragmentAction = (
    codef: string,
    setCode: Function,
    fun?: TextInput | null,
    setCodeNext?: Function,
  ): string => {
    if (codef.length > 1) {
      fun?.focus();
      setCode(codef.split("")[0]);
      setCodeNext ? setCodeNext(codef.split("")[1]) : undefined;
      return setCode(codef.split("")[0]);
    } else {
      return codef;
    }
  };
  const codeJoin = () => {
    saveCodeJoin({ code });
    navigation.navigate(screen.InputPlayer);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Text>Code Join Screen</Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={style.TextInput}
          placeholder={"#"}
          onChangeText={setCode1}
          autoCapitalize={"none"}
          autoFocus={true}
          value={code1}
          ref={code1Input}
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => code2Input.current?.focus()}
        />
        <TextInput
          style={style.TextInput}
          placeholder={"#"}
          onChangeText={setCode2}
          autoCapitalize={"none"}
          value={code2}
          ref={code2Input}
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => code3Input.current?.focus()}
        />
        <TextInput
          style={style.TextInput}
          placeholder={"#"}
          onChangeText={setCode3}
          autoCapitalize={"none"}
          value={code3}
          ref={code3Input}
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => code4Input.current?.focus()}
        />
        <TextInput
          style={style.TextInput}
          placeholder={"#"}
          onChangeText={setCode4}
          autoCapitalize={"none"}
          value={code4}
          ref={code4Input}
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => code5Input.current?.focus()}
        />
        <TextInput
          style={style.TextInput}
          placeholder={"#"}
          onChangeText={setCode5}
          autoCapitalize={"none"}
          value={code5}
          ref={code5Input}
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => code6Input.current?.focus()}
        />
        <TextInput
          style={style.TextInput}
          placeholder={"#"}
          onChangeText={setCode6}
          autoCapitalize={"none"}
          value={code6}
          ref={code6Input}
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => code7Input.current?.focus()}
        />
        <TextInput
          style={style.TextInput}
          placeholder={"#"}
          onChangeText={setCode7}
          autoCapitalize={"none"}
          value={code7}
          ref={code7Input}
          blurOnSubmit={false}
          returnKeyType="next"
          onSubmitEditing={() => code8Input.current?.focus()}
        />
        <TextInput
          style={style.TextInput}
          placeholder={"#"}
          onChangeText={setCode8}
          autoCapitalize={"none"}
          value={code8}
          ref={code8Input}
          blurOnSubmit={true}
          returnKeyType="send"
          onSubmitEditing={codeJoin}
        />
      </View>
      <Button title={"join"} onPress={codeJoin} />
      <Button title={"goBack"} onPress={() => navigation.goBack()} />
    </View>
  );
};
