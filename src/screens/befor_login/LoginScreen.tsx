import {
  SafeAreaView,
  TextInput,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useRef } from "react";
import { screen } from "../../enum/screen.ts";
import { RootStackParamList } from "../rootStats.ts";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Spacer from "../../components/spacer";
import { Colors } from "../../styles/Colors.ts";
import { style } from "../../styles/loginRegisterStyle.ts";
import Button from "../../components/Button";
import { login } from "../../api/login.ts";
import { Direction, magicModal } from "react-native-magic-modal";
import { QuickModal } from "../../components/popup";
import { handleQuickModal } from "../../handler/Modalhandler.ts";



type Props = NativeStackScreenProps<RootStackParamList, screen.Login>;

export const LoginScreen = ({ navigation, route }: Props) => {
  const passwordInput = useRef<TextInput>(null);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const loginAction = async () => {
    // console.log("login");
    login(username, password)
      .then(() => {
        route.params.login().catch(e => {
          console.log("work i", e);
          handleQuickModal(<QuickModal text={"Login failed\nwrong username or password"} />, 3000);
          // throw new Error("no login");
        });
      })
      .catch(e => {
        handleQuickModal(<QuickModal text={"Login failed\nwrong username or password"} />, 3000);
        // handleQuickModal();

        console.log("work a", e);
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
      {/*<BasicPopup />*/}
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
        onSubmitEditing={loginAction}
      />
      <Spacer height={50} />

      <Button onPress={loginAction} title={"Login"} />
      <Button
        title={"register"}
        onPress={() => navigation.push(screen.Register)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    backgroundColor: "#f0f0f0",
    margin: 20,
    paddingHorizontal: 25,
    paddingVertical: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  body: {
    textAlign: "center",
    fontSize: 14,
  },
  buttonContainer: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 25,
    backgroundColor: "#fab54d",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
