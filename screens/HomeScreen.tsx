import { Button, Text, View } from 'react-native';
import React from 'react';

export const HomeScreen = () => {
  return (
    <View>
      <View
        style={{
          backgroundColor: 'black',
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Text>home</Text>
        <Button title={'title'} onPress={() => {}} />
      </View>
    </View>
  );
};
