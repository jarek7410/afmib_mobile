import { Button, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './rootStats.ts';
import { screen } from '../enum/screen.ts';

type Props = NativeStackScreenProps<RootStackParamList, screen.Home>;
export const HomeScreen = ({ navigation }: Props) => {
  return (
    <View>
      <View
        style={{
          alignContent: 'center',
          backgroundColor: 'black',
          justifyContent: 'center',
        }}>
        <Text>home</Text>
        <Button
          title={'join by code'}
          onPress={() => navigation.push(screen.CodeJoin)}
        />
      </View>
    </View>
  );
};
