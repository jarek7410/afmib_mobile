// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from './screens/HomeScreen.tsx';
import { screen } from './enum/screen.ts';
import { LoginScreen } from './screens/befor_login';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './screens/rootStats.ts';
import { useState } from 'react';
import { RegisterScreen } from './screens/befor_login';
import { CodeJoinScreen } from './screens/CodeJoinScreen.tsx';
import { InputPlayerScreen } from './screens/InputPlayerScreen.tsx';
import { SummaryScreen } from './screens/turnament/SummaryScreen.tsx';
import { InfoReceiverScreen } from './screens/turnament/InfoReciverScreen.tsx';
import { MovementScreen } from './screens/turnament/MovementScreen.tsx';
import { InputDataScreen } from './screens/turnament/InputDataScreen.tsx';
import { AppSettingScreen } from './screens/settings/AppSettingScreen.tsx';
import { Button } from 'react-native';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const [login, setLogin] = useState(false);
  const loginToApp = () => {
    console.log('login');
    setLogin(!login);
  };
  return (
    <NavigationContainer>
      {login ? (
        <Stack.Navigator initialRouteName={screen.Home}>
          <Stack.Screen
            name={screen.Home}
            options={({ navigation }) => ({
              headerRight: () => (
                <Button
                  title={'Setting'}
                  onPress={() => navigation.navigate(screen.Settings)}
                />
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
            initialParams={{ login: loginToApp }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName={screen.Login}>
          <Stack.Screen
            name={screen.Login}
            component={LoginScreen}
            initialParams={{ login: loginToApp }}
          />
          <Stack.Screen name={screen.Register} component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
