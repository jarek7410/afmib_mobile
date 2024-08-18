// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./src/screens/HomeScreen.tsx";
import { screen } from "./src/enum/screen.ts";
import { LoginScreen } from "./src/screens/befor_login";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./src/screens/rootStats.ts";
import { useEffect, useState } from "react";
import { RegisterScreen } from "./src/screens/befor_login";
import { CodeJoinScreen } from "./src/screens/CodeJoinScreen.tsx";
import { InputPlayerScreen } from "./src/screens/InputPlayerScreen.tsx";
import { SummaryScreen } from "./src/screens/turnament/SummaryScreen.tsx";
import { InfoReceiverScreen } from "./src/screens/turnament/InfoReciverScreen.tsx";
import { MovementScreen } from "./src/screens/turnament/MovementScreen.tsx";
import { InputDataScreen } from "./src/screens/turnament/InputDataScreen.tsx";
import { AppSettingScreen } from "./src/screens/settings/AppSettingScreen.tsx";
import { getToken } from "./src/storage/login.ts";
import { LoadingScreen } from "./src/screens/LoadingScreen.tsx";
import Button from "./src/components/Button";
import Text from "./src/components/Text/index.ts";
import { getCodeJoin } from "./src/storage/tournament.ts";
// import Icon from "react-native-vector-icons/AntDesign";

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const [login, setLogin] = useState<boolean | null>(null);
  const [isJoin, setIsJoin] = useState<boolean>(false);

  useEffect(() => {
    getToken().then(jwt => {
      if (jwt != null) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  }, []);

  const loginToApp = () => {
    console.log("logout");
    setLogin(false);
  };
  const loginAction = async () => {
    if ((await getToken()) != null) {
      setLogin(true);
    } else {
      console.log("App,loginActin: no jwt");
    }
  };
  const joinToTournamtnt = () =>{
    console.log("join to tournament ");
    setIsJoin(true);
  };
  const exitTournament = () => {
    console.log("exit tournament");
    setIsJoin(false);
  };

  if (login === null) {
    return <LoadingScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screen.Login}>
        {login && (
          <>
            {!isJoin && (
              <Stack.Group>
                <Stack.Screen
                  name={screen.Home}
                  options={({ navigation }) => ({
                    headerRight: () => (
                      <Button
                        style={{ width: 75 }}
                        onPress={() => navigation.navigate(screen.Settings)}>
                        <Text>settings</Text>
                      </Button>
                    ),
                  })}
                  component={HomeScreen}
                />
                <Stack.Screen
                  name={screen.CodeJoin}
                  component={CodeJoinScreen}
                />
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
                <Stack.Screen
                  name={screen.Movement}
                  component={MovementScreen}
                />
                <Stack.Screen
                  name={screen.InputData}
                  component={InputDataScreen}
                />
              </Stack.Group>
            )}
            <Stack.Screen
              name={screen.Settings}
              component={AppSettingScreen}
              initialParams={{ logout: loginToApp }}
            />
          </>
        )}
        {!login && (
          <Stack.Group>
            <Stack.Screen
              name={screen.Login}
              component={LoginScreen}
              initialParams={{ login: loginAction }}
            />
            <Stack.Screen name={screen.Register} component={RegisterScreen} />
            <Stack.Screen
              name={screen.Loading}
              component={LoadingScreen}
              options={{ headerShown: false }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
