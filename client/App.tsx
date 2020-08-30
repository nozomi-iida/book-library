import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from './src/components/pages/SignIn';
import SignUp from './src/components/pages/SignUp';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Apply from './src/components/pages/Apply';
import Permit from './src/components/pages/Permit';
import Loading from './src/components/pages/Loading';
import Read from './src/components/pages/Read';
import FlatList from './src/components/atoms/FlatList';
import ApplyList from './src/components/pages/ApplyList';

const Stack = createStackNavigator();

const MainScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name='Apply' component={ApplyList} />
      <Tab.Screen name='Permit' component={Permit} />
      <Tab.Screen name='Read' component={Read} />
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
