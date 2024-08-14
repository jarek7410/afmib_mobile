import React from 'react';
import { Button, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../rootStats.ts';
import { screen } from '../../enum/screen.ts';

type Props = NativeStackScreenProps<RootStackParamList, screen.InfoReceiver>;

export const InfoReceiverScreen = ({ navigation }: Props) => {
  return (
    <View>
      <View>
        <Text>Info receiver</Text>
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
