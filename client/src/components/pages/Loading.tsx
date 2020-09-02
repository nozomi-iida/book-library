import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  signIn: undefined;
  main: undefined;
};

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'signIn' | 'main'
>;

type Props = {
  navigation: ScreenNavigationProp;
};

export default function Loading({ navigation }: Props) {
  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.replace('main');
    } else {
      navigation.replace('signIn');
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);
  return (
    <View style={styles.loading}>
      <ActivityIndicator size='large' color='blue' />
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
