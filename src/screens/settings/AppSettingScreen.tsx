import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../rootStats.ts";
import { screen } from "../../enum/screen.ts";
import { isLogin, logout, logout as Logout } from "../../storage/login.ts";
import Button from "../../components/Button";
import { style } from "../../styles/loginRegisterStyle.ts";
import { getMyObjects } from "../../api/getMe.ts";
import { MeDataDto, saveMeDataDto } from "../../storage/dto.ts";
import { clearDB, dbOptions } from "../../storage/dbOptions.ts";
import { setMyObjects } from "../../api/saveMe.ts";
import { handleQuickModal } from "../../handler/Modalhandler.ts";
import { QuickModal } from "../../components/popup";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { setLangue } from "../../storage/langue.ts";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

export const AppSettingScreen = ({ route,navigation }: Props) => {
  const {t} = useTranslation();
  const [islogin, setislogin] = useState<string>("");
  useEffect(() => {
    isLogin().then((r) => {
      setislogin(r.toString());
    });
  }, []);
  return (
    <SafeAreaView style={style.centralizeContainer}>
      <ScrollView>
        <View style={style.horizontalContainer}>
          <Button style={{width:100}} title={t("language.pl")} onPress={() => {
            i18next.changeLanguage("pl")
            setLangue("pl")
          }}
          />
          <Button style={{width:100}} title={t("language.en")} onPress={() => {
            i18next.changeLanguage("en");
            setLangue("en")

          }} />
        </View>
        <View style={style.centralizeContainer}>
          {!islogin&&
            <>
              <Button title={t("logout")} onPress={Logout} />
              <Button title={t("changeUserData")} onPress={()=>{navigation.navigate("UserSettings")}} />
            </>
          }
          {islogin&&
            <>
              <Button title={t("login")} onPress={()=>navigation.navigate("Login")}/>
            </>
          }
          <Button title={"dump db data to logs"} onPress={dbOptions} />
          <Button
            title={"clear App Data"}
            onPress={() => {
              clearDB();
              logout();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
