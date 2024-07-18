import React, { useRef } from "react";
import { SafeAreaView, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { screen } from "../../enum/screen.ts";
import { RootStackParamList } from "../rootStats.ts";
import { style } from "../../styles/loginRegisterStyle.ts";
import { Colors } from "../../styles/Colors.ts";
import Button from "../../components/Button";
import { getServerURL } from "../../storage/login.ts";

type Props = NativeStackScreenProps<RootStackParamList, screen.Register>;

export const RegisterScreen = ({ navigation }: Props) => {
  const passwordInput = useRef<TextInput>(null);
  const emailInput = useRef<TextInput>(null);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const register = async () => {
    console.log("register: " + username + " " + email);
    console.log((await getServerURL()) + "auth/user/register");

    const response = await fetch(
      (await getServerURL()) + "auth/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      },
    );
    if (!response.ok) {
      console.log("register failed");
      return;
    }
    console.log("register success");
    navigation.goBack();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TextInput
            style={style.TextInput}
            value={username}
            onChangeText={setUsername}
            placeholder={"username"}
            autoFocus={true}
            autoCapitalize={"none"}
            returnKeyType="next"
            onSubmitEditing={() => emailInput.current?.focus()}
            blurOnSubmit={false}
          />
          <TextInput
            style={style.TextInput}
            placeholder={"email"}
            onChangeText={setEmail}
            value={email}
            autoCapitalize={"none"}
            inputMode={"email"}
            ref={emailInput}
            returnKeyType="next"
            onSubmitEditing={() => passwordInput.current?.focus()}
            blurOnSubmit={false}
          />

          <TextInput
            style={style.TextInput}
            placeholder={"password"}
            onChangeText={setPassword}
            autoCapitalize={"none"}
            value={password}
            secureTextEntry
            ref={passwordInput}
            blurOnSubmit={true}
            returnKeyType="send"
            onSubmitEditing={register}
          />
          <Button title={"register"} onPress={register} />
        </View>
      </View>
    </SafeAreaView>
  );
};
