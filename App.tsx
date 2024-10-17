// In App.js in a new project
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./src/screens/HomeScreen.tsx";
import { screen } from "./src/enum/screen.ts";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./src/screens/rootStats.ts";
import { useEffect, useState } from "react";
import { Colors } from "./src/styles/Colors.ts";
import { CodeJoinScreen } from "./src/screens/CodeJoinScreen.tsx";
import { InputPlayerScreen } from "./src/screens/InputPlayerScreen.tsx";
import { SummaryScreen } from "./src/screens/turnament/SummaryScreen.tsx";
import { InfoReceiverScreen } from "./src/screens/turnament/InfoReciverScreen.tsx";
import { MovementScreen } from "./src/screens/turnament/MovementScreen.tsx";
import { InputDataScreen } from "./src/screens/turnament/InputDataScreen.tsx";
import { AppSettingScreen } from "./src/screens/settings/AppSettingScreen.tsx";
import Button from "./src/components/Button";
import Text from "./src/components/Text/index.ts";
import { MagicModalPortal } from "react-native-magic-modal";
import { useTranslation } from "react-i18next";
import { UserSettingsScreen } from "./src/screens/settings/userSettings.tsx";
import { LoginScreen, RegisterScreen } from "./src/screens/befor_login";
import i18next from "i18next";
import { getLangue } from "./src/storage/langue.ts";
import { InputReceiveData } from "./src/screens/turnament/InputReceiveData.tsx";

const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const { t } = useTranslation();
  // const [login, setLogin] = useState<boolean | null>(null);
  const [isJoin, setIsJoin] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      i18next.changeLanguage(await getLangue());
    })();
  }, []);
  const joinToTournamtnt = () => {
    console.log("join to tournament ");
    setIsJoin(true);
  };
  const exitTournament = () => {
    console.log("exit tournament");
    setIsJoin(false);
  };

  // if (login === null) {
  //   return <LoadingScreen />;
  // }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.car,
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          initialRouteName={screen.Home}>
          {!isJoin && (
            <Stack.Group>
              <Stack.Screen
                name={screen.Home}
                options={({ navigation }) => ({
                  headerRight: () => (
                    <Button
                      style={{ width: 80 }}
                      onPress={() => navigation.navigate(screen.Settings)}>
                      <Text>{t("settings.settings")}</Text>
                    </Button>
                  ),
                })}
                component={HomeScreen}
              />
              <Stack.Screen name={screen.CodeJoin} component={CodeJoinScreen} />
              <Stack.Screen
                name={screen.InputPlayer}
                component={InputPlayerScreen}
                initialParams={{ join: joinToTournamtnt }}
              />
            </Stack.Group>
          )}
          {isJoin && (
            <Stack.Group>
              <Stack.Screen
                name={screen.Summary}
                component={SummaryScreen}
                initialParams={{ exit: exitTournament }}
              />

              <Stack.Screen
                name={screen.InfoReceiver}
                component={InfoReceiverScreen}
              />
              <Stack.Screen name={screen.Movement} component={MovementScreen} />
              <Stack.Screen
                name={screen.InputData}
                component={InputDataScreen}
              />
              <Stack.Screen
                name={"InputReceiveData"}
                component={InputReceiveData}
              />
            </Stack.Group>
          )}
          <Stack.Screen
            name={screen.Settings}
            component={AppSettingScreen}
            // initialParams={{ logout: loginToApp }}
          />
          <Stack.Screen
            name={"UserSettings"}
            component={UserSettingsScreen}
            // initialParams={{ logout: loginToApp }}
          />
          <Stack.Group>
            <Stack.Screen name={"Login"} component={LoginScreen} />
            <Stack.Screen name={"Register"} component={RegisterScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
      <MagicModalPortal />
    </GestureHandlerRootView>
  );
}

export default App;
