import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ログイン: undefined;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ログイン'>;

type Props = {
  navigation: ScreenNavigationProp;
};

export default function Permit({ navigation }: Props) {
  const Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://localhost:8000/user/', {
      headers: new Headers({
        Authorization: 'Bearer ' + token,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };

  useEffect(() => {
    Boiler();
  }, []);
  const logout = () => {
    AsyncStorage.removeItem('token').then(() => {
      navigation.replace('ログイン');
    });
  };
  return (
    <View>
      <Button title='ログアウト' onPress={() => logout()} />
    </View>
  );
}
