import React from 'react';
import { Button, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { screen } from '../../enum/screen.ts';
import { RootStackParamList } from '../rootStats.ts';

type Props = NativeStackScreenProps<RootStackParamList, screen.Register>;

export const RegisterScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Register Screen</Text>
      <Button
        title={'register'}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};
