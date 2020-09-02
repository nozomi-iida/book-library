import React from 'react';
import { View, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { signOutuser } from '../../actions/user';

type RootStackParamList = {
  signIn: undefined;
};

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'signIn'>;

type Props = {
  navigation: ScreenNavigationProp;
};

export default function Permit({ navigation }: Props) {
  const dispatch =useDispatch();
  const logout = () => {
    dispatch(signOutuser());
    navigation.replace('signIn');
  };
  return (
    <View>
      <Button title='ログアウト' onPress={() => logout()} />
    </View>
  );
}
