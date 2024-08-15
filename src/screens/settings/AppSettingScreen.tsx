import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../rootStats.ts";
import { screen } from "../../enum/screen.ts";
import { getServerURL, getToken, setLoginData } from "../../storage/login.ts";
import Button from "../../components/Button";
import { style } from "../../styles/loginRegisterStyle.ts";
import { getMyObjects } from "../../api/getMe.ts";
import { MeDataDto } from "../../storage/dto.ts";

type Props = NativeStackScreenProps<RootStackParamList, screen.Settings>;

export const AppSettingScreen = ({ route }: Props) => {
  const [PID, setPID] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  // const  [phone, setPhone] = useState<string>("");
  // const  [address, setAddress] = useState<string>("");
  // const  [city, setCity] = useState<string>("");
  // const  [state, setState] = useState<string>("");
  // const  [zip, setZip] = useState<string>("");
  // const  [country, setCountry] = useState<string>("");
  useEffect(() => {
    getMyObjects().then((jsonValue: MeDataDto) => {
      console.log(jsonValue);
      setName(jsonValue.name);
      setSurname(jsonValue.surname);
      setEmail(jsonValue.email);
      setPID(jsonValue.pid);
      setUsername(jsonValue.username);
    });
  }, []);

  const logout = () => {
    route.params.logout();
    setLoginData({ token: "", name: "", email: "" }).then(() => {
      console.log("logout");
    });
  };
  const save = () => {
    console.log("save");
  };
  return (
    <SafeAreaView style={[style.centralizeContainer]}>
      <ScrollView>
        <View style={style.centralizeContainer}>
          <TextInput
            style={style.TextInput}
            placeholder={"PID"}
            value={PID}
            onChangeText={setPID}
            autoCapitalize={"none"}
            inputMode={"numeric"}
          />
          <View style={[{ flexDirection: "row" }, style.centralizeContainer]}>
            <TextInput
              style={[style.TextInput, { width: 150 }]}
              placeholder={"Name"}
              value={name}
              onChangeText={setName}
              autoCapitalize={"words"}
              inputMode={"text"}
            />
            <TextInput
              style={[style.TextInput, { width: 150 }]}
              placeholder={"Surname"}
              value={surname}
              onChangeText={setSurname}
              autoCapitalize={"words"}
              inputMode={"text"}
            />
          </View>
          <TextInput
            style={style.TextInput}
            value={username}
            onChangeText={setUsername}
            placeholder={"username"}
            autoCapitalize={"none"}
          />
          <TextInput
            style={style.TextInput}
            placeholder={"email"}
            onChangeText={setEmail}
            value={email}
            autoCapitalize={"none"}
            inputMode={"email"}
          />

          <TextInput
            style={style.TextInput}
            placeholder={"password"}
            onChangeText={setPassword}
            autoCapitalize={"none"}
            value={password}
            secureTextEntry
          />
          <TextInput
            style={style.TextInput}
            placeholder={"new password"}
            onChangeText={setNewPassword}
            autoCapitalize={"none"}
            value={newPassword}
            secureTextEntry
          />
          <TextInput //TODO: add password validation
            style={style.TextInput}
            placeholder={"repeat new password"}
            onChangeText={setNewPassword}
            autoCapitalize={"none"}
            value={newPassword}
            secureTextEntry
          />
          <Button title={"save"} onPress={save} />
          <Button title={"logout"} onPress={logout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};