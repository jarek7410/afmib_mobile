// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./screens/HomeScreen.tsx";
import { screen } from "./enum/screen.ts";
import { LoginScreen } from "./screens/befor_login";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./screens/rootStats.ts";
import { useEffect, useState } from "react";
import { RegisterScreen } from "./screens/befor_login";
import { CodeJoinScreen } from "./screens/CodeJoinScreen.tsx";
import { InputPlayerScreen } from "./screens/InputPlayerScreen.tsx";
import { SummaryScreen } from "./screens/turnament/SummaryScreen.tsx";
import { InfoReceiverScreen } from "./screens/turnament/InfoReciverScreen.tsx";
import { MovementScreen } from "./screens/turnament/MovementScreen.tsx";
import { InputDataScreen } from "./screens/turnament/InputDataScreen.tsx";
import { AppSettingScreen } from "./screens/settings/AppSettingScreen.tsx";
import { GetToken } from "./storage/login.ts";
import { LoadingScreen } from "./screens/LoadingScreen.tsx";
import Button from "./components/Button";
import Text from "./components/Text/index.ts";
// import Icon from "react-native-vector-icons/AntDesign";

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const [login, setLogin] = useState<boolean | null>(null);

  useEffect(() => {
    GetToken().then(jwt => {
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
    if ((await GetToken()) != null) {
      setLogin(true);
    } else {
      console.log("App,loginActin: no jwt");
    }
  };
  if (login === null) {
    return <LoadingScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={screen.Login}>
        {login && (
          <Stack.Group
          // initialRouteName={screen.Home}
          >
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
            <Stack.Screen name={screen.CodeJoin} component={CodeJoinScreen} />
            <Stack.Screen
              name={screen.InputPlayer}
              component={InputPlayerScreen}
            />
            <Stack.Screen name={screen.Summary} component={SummaryScreen} />
            <Stack.Screen
              name={screen.InfoReceiver}
              component={InfoReceiverScreen}
            />
            <Stack.Screen name={screen.Movement} component={MovementScreen} />
            <Stack.Screen name={screen.InputData} component={InputDataScreen} />
            <Stack.Screen
              name={screen.Settings}
              component={AppSettingScreen}
              initialParams={{ logout: loginToApp }}
            />
          </Stack.Group>
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
