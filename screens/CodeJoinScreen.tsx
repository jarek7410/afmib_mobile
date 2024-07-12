import React from 'react';
import { View, Text, Button } from 'react-native';
import { RootStackParamList } from './rootStats.ts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { screen } from '../enum/screen.ts';

type Props = NativeStackScreenProps<RootStackParamList, screen.CodeJoin>;

export const CodeJoinScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Code Join Screen</Text>
      <Button
        title={'join'}
        onPress={() => navigation.navigate(screen.InputPlayer)}
      />
      <Button title={'goBack'} onPress={() => navigation.goBack()} />
    </View>
  );
};
