import React from 'react';
import { Button, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../rootStats.ts';
import { screen } from '../../enum/screen.ts';

type Props = NativeStackScreenProps<RootStackParamList, screen.Movement>;

export const MovementScreen = ({ navigation }: Props) => {
  return (
    <View>
      <View>
        <Text>Movement</Text>
        <Button
          title={'Select'}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
};
