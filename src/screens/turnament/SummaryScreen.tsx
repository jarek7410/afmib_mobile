import React from 'react';
import { Button, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../rootStats.ts';
import { screen } from '../../enum/screen.ts';

type Props = NativeStackScreenProps<RootStackParamList, screen.Summary>;

export const SummaryScreen = ({ navigation }: Props) => {
  return (
    <View>
      <View>
        <Text>Info receiver</Text>
        <Button
          title={'info reciveer'}
          onPress={() => {
            navigation.navigate(screen.InfoReceiver);
          }}
        />
        <Button
          title={'movement'}
          onPress={() => {
            navigation.navigate(screen.Movement);
          }}
        />
        <Button
          title={'input data'}
          onPress={() => {
            navigation.navigate(screen.InputData);
          }}
        />
        <Button
          title={'exit turnament'}
          onPress={() => {
            navigation.navigate(screen.Home);
            navigation.reset({ routes: [{ name: screen.Home }] });
          }}
        />
      </View>
    </View>
  );
};
