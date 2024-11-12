import React, { useEffect, useState } from "react";
import { View, TextInput } from "react-native";
import { RootStackParamList } from "./rootStats.ts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { screen } from "../enum/screen.ts";
import { style } from "../styles/codeJoinSytle.ts";
import { saveCodeJoin } from "../storage/tournament.ts";
import Button from "../components/Button";
import { Colors } from "../styles/Colors.ts";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from "react-native-vision-camera";
import { InputPlayerScreen } from "./InputPlayerScreen.tsx";

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
  const [code8, setCode8] = useState<string>("");
  const [magicCode, setMagicCode] = useState<string>("");

  const { hasPermission, requestPermission } = useCameraPermission();
  const [cameraIsActive, setCameraIsActive] = useState<boolean>(true);
  useEffect(() => {
    if (!hasPermission) {
      requestPermission().then(bo => {
        if (!bo) {
          console.log("break app... I need camera permission");
        }
      });
    }
  }, [hasPermission, requestPermission]);
  const device = useCameraDevice("back");

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: codes => {
      try {
        const codee = codes[0].value;
        if (codee) {
          console.log(JSON.parse(codee).code);
          setMagicCode(JSON.parse(codee).code);
          setCameraIsActive(false);
        }
        // console.log(`Scanned ${codes.length} codes!\n${codes[0].value}`);
      } catch (e) {
        console.log(e);
      }
    },
  });
  useEffect(() => {
    const codeTable = magicCode.split("");
    if (codeTable.length > 0) {
      setCode1(codeTable[0]);
    }
    if (codeTable.length > 1) {
      setCode2(codeTable[1]);
    }
    if (codeTable.length > 2) {
      setCode3(codeTable[2]);
    }
    if (codeTable.length > 3) {
      setCode4(codeTable[3]);
    }
    if (codeTable.length > 4) {
      setCode5(codeTable[4]);
    }
    if (codeTable.length > 5) {
      setCode6(codeTable[5]);
    }
    if (codeTable.length > 6) {
      setCode7(codeTable[6]);
    }
    if (codeTable.length > 7) {
      setCode8(codeTable[7]);
    }
  }, [magicCode]);
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
    setCod: Function,
    fun?: TextInput | null,
    setCodeNext?: Function,
  ): string => {
    if (codef.length > 1) {
      fun?.focus();
      setCod(codef.split("")[0]);
      setCodeNext ? setCodeNext(codef.slice(1)) : undefined;
      return setCod(codef.split("")[0]);
    } else {
      return codef;
    }
  };
  const codeJoin = () => {
    saveCodeJoin({ code });
    navigation.navigate("InputPlayer");
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}>
      {cameraIsActive && device && hasPermission && (
        <Camera
          style={{ width: 200, height: 200 }}
          device={device}
          codeScanner={codeScanner}
          isActive={true}
        />
      )}
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={style.TextInput}
          placeholder={"#"}
          onChangeText={setCode1}
          autoCapitalize={"characters"}
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
          autoCapitalize={"characters"}
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
          autoCapitalize={"characters"}
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
          autoCapitalize={"characters"}
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
          autoCapitalize={"characters"}
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
          autoCapitalize={"characters"}
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
          autoCapitalize={"characters"}
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
          autoCapitalize={"characters"}
          value={code8}
          ref={code8Input}
          blurOnSubmit={true}
          returnKeyType="send"
          onSubmitEditing={codeJoin}
        />
      </View>
      <Button title={"join"} onPress={codeJoin} />
    </View>
  );
};
