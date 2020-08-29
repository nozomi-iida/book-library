import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Apply from './src/components/pages/Apply';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from './src/components/pages/SignIn';
import SignUp from './src/components/pages/SignUp';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Permit from './src/components/pages/Permit';
import Loading from './src/components/pages/Loading';

const Stack = createStackNavigator();

const AuthScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='新規登録' component={SignUp} />
      <Stack.Screen name='ログイン' component={SignIn} />
    </Stack.Navigator>
  );
};

const MainScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name='Permit' component={Permit} />
      <Tab.Screen name='Home' component={Apply} />
    </Tab.Navigator>
  );
};

export default function App() {
  const Tab = createBottomTabNavigator();
  const [loggedIn, setLoggedin] = useState<boolean>(false);

  const detectLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  };
  useEffect(() => {
    detectLogin();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Loading' component={Loading} />
        <Stack.Screen name='新規登録' component={SignUp} />
        <Stack.Screen name='ログイン' component={SignIn} />
        <Stack.Screen name='Main' component={MainScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 30,
    height: '100%',
  },
});
