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

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator<RootStackParamList>();

function App() {
  const [login, setLogin] = useState(false);
  const loginToApp = () => {
    console.log('login');
    setLogin(true);
  };
  return (
    <NavigationContainer>
      {login ? (
        <Stack.Navigator initialRouteName={screen.Home}>
          <Stack.Screen name={screen.Home} component={HomeScreen} />
          <Stack.Screen name={screen.CodeJoin} component={CodeJoinScreen} />
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
