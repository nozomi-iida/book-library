import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export default () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='signIn'
        options={{
          title: 'ログイン',
        }}
        component={SignIn}
      />
      <Stack.Screen
        name='signUp'
        options={{
          title: '新規登録',
        }}
        component={SignUp}
      />
    </Stack.Navigator>
  );
};
