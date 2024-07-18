import { SafeAreaView, TextInput } from "react-native";
import React, { useRef } from "react";
import { screen } from "../../enum/screen.ts";
import { RootStackParamList } from "../rootStats.ts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Spacer from "../../components/spacer";
import { Colors } from "../../styles/Colors.ts";
import { style } from "../../styles/loginRegisterStyle.ts";
import { getServerURL, setLoginData } from "../../storage/login.ts";
import Button from "../../components/Button";

type Props = NativeStackScreenProps<RootStackParamList, screen.Login>;

export const LoginScreen = ({ navigation, route }: Props) => {
  const passwordInput = useRef<TextInput>(null);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const login = async () => {
    console.log("login");
    const response = await fetch((await getServerURL()) + "auth/user/login/", {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${get}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      console.log("login failed");
      return;
    }
    const data = await response.json();
    console.log(data);
    const token = data.token;
    setLoginData({ email: undefined, name: username, token }).then(() => {
      route.params.logout();
    });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.background,
      }}>
      {/*TODO: hash password!!!!, validate email, validate password*/}
      <TextInput
        style={style.TextInput}
        value={username}
        onChangeText={setUsername}
        placeholder={"username"}
        autoFocus={true}
        returnKeyType="next"
        onSubmitEditing={() => passwordInput.current?.focus()}
        blurOnSubmit={false}
        autoCapitalize={"none"}
      />
      <TextInput
        style={style.TextInput}
        placeholder={"password"}
        onChangeText={setPassword}
        value={password}
        autoCapitalize={"none"}
        secureTextEntry
        ref={passwordInput}
        blurOnSubmit={true}
        returnKeyType="send"
        onSubmitEditing={login}
      />
      <Spacer height={50} />

      <Button onPress={login} title={"Login"} />
      <Button
        title={"register"}
        onPress={() => navigation.push(screen.Register)}
      />
    </SafeAreaView>
  );
};
