import React, { useRef } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { screen } from "../../enum/screen.ts";
import { RootStackParamList } from "../rootStats.ts";
import { LoginRegisterStyle } from "../../styles/loginRegisterStyle.ts";
import { Colors } from "../../styles/Colors.ts";

type Props = NativeStackScreenProps<RootStackParamList, screen.Register>;

export const RegisterScreen = ({ navigation }: Props) => {
  const passwordInput = useRef<TextInput>(null);
  const emailInput = useRef<TextInput>(null);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const register = async () => {
    console.log("register: " + username + " " + email);
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Text>Register Screen</Text>
      <Button
        title={"go back"}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextInput
          style={LoginRegisterStyle.TextInput}
          value={username}
          onChangeText={setUsername}
          placeholder={"username"}
          autoFocus={true}
          returnKeyType="next"
          onSubmitEditing={() => emailInput.current?.focus()}
          blurOnSubmit={false}
        />
        <TextInput
          style={LoginRegisterStyle.TextInput}
          placeholder={"email"}
          onChangeText={setEmail}
          value={email}
          // secureTextEntry
          ref={emailInput}
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
        <Button title={"register"} onPress={register} />
      </View>
    </View>
  );
};
