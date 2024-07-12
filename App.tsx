// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './screens/HomeScreen.tsx';
import { screen } from './enum/screen.ts';
import { LoginScreen } from './screens/LoginScreen.tsx';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={screen.Home} component={HomeScreen} />
        <Stack.Screen name={screen.Login} component={LoginScreen} />
        <Stack.Screen name={screen.Register} component={HomeScreen} />
        <Stack.Screen name={screen.CodeJoin} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
