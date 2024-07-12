import { Button, Text, View } from 'react-native';
import React from 'react';
import { screen } from '../../enum/screen.ts';
import { RootStackParamList } from '../rootStats.ts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, screen.Login>;

export const LoginScreen = ({ navigation, route }: Props) => {
  return (
    <View>
      <Text>Login Screen</Text>
      <Button
        title={'login'}
        onPress={() => {
          // navigation.navigate(screen.Home);
          route.params.login();
          navigation.navigate(screen.Home);
        }}
      />
      <Button
        title={'register'}
        onPress={() => navigation.push(screen.Register)}
      />
    </View>
  );
};
