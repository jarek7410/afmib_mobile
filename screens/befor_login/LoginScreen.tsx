import { Button, TextInput, View } from "react-native";
import React, { useRef } from "react";
import { screen } from "../../enum/screen.ts";
import { RootStackParamList } from "../rootStats.ts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Spacer from "../../components/spacer";
import { Colors } from "../../styles/Colors.ts";
import Text from "../../components/Text";
import { LoginRegisterStyle } from "../../styles/loginRegisterStyle.ts";
import { setLoginData } from "../../storage/login.ts";

type Props = NativeStackScreenProps<RootStackParamList, screen.Login>;

export const LoginScreen = ({ navigation, route }: Props) => {
  const passwordInput = useRef<TextInput>(null);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const login = async () => {
    console.log("login");
    setLoginData({ email: undefined, name: username, jwt: "aaaa" }).then(() => {
      route.params.login();
    });
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background,
      }}>
      <Text>Register: not jest hash</Text>
      {/*TODO: hash password!!!!, validate email, validate password*/}
      <TextInput
        style={LoginRegisterStyle.TextInput}
        value={username}
        onChangeText={setUsername}
        placeholder={"username"}
        autoFocus={true}
        returnKeyType="next"
        onSubmitEditing={() => passwordInput.current?.focus()}
        blurOnSubmit={false}
      />
      <TextInput
        style={LoginRegisterStyle.TextInput}
        placeholder={"password"}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        ref={passwordInput}
        blurOnSubmit={true}
        returnKeyType="send"
      />
      <Spacer height={50} />

      <Button onPress={login} title={"Login"} />

      <Button
        title={"register"}
        onPress={() => navigation.push(screen.Register)}
      />
    </View>
  );
};
