import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Apply from './src/components/pages/Apply';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from './src/components/pages/SignIn';
import SignUp from './src/components/pages/SignUp';
// import StoryBook from './src/StoryBook'

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer >
      <Tab.Navigator>
        <Tab.Screen name='Home' component={SignUp} />
        <Tab.Screen name='SignIn' component={SignIn} />
      </Tab.Navigator>
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
