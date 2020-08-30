import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ログイン: undefined;
  Main: undefined;
};

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ログイン' | 'Main'
>;

type Props = {
  navigation: ScreenNavigationProp;
};

export default function Loading({ navigation }: Props) {
  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      navigation.replace('Main');
    } else {
      navigation.replace('ログイン');
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
