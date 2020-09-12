import React, { useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabScreen from './TabScreen';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { DrawerActions } from '@react-navigation/native';
import ApplyForm from '../pages/ApplyForm';
import EditForm from '../pages/EditForm';
import BookDetail from '../pages/BookDetail';
import PermitForm from '../pages/PermitForm';
import ReadForm from '../pages/ReadForm';
import { AuthContext } from '../../stores/authStore';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import AuthScreen from './AuthScreen';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const Stack = createStackNavigator();

export default ({ navigation }: DrawerContentComponentProps) => {
  const { loginState, authDispatch } = useContext(AuthContext);
  const Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    if(token) {
      try {
        const { data } = await axios.get(
          // 'https://frozen-bastion-73398.herokuapp.com/user',
          // 'http://localhost:8000/user',
          'http://192.168.0.22:8000/user',
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
        authDispatch({ type: 'FETCH_USER', data: data });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    Boiler();
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='main'
        component={TabScreen}
        options={{
          title: 'CV Library',
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              {loginState.userToken ? (
                <Icon.Button
                  name='menuunfold'
                  onPress={() =>
                    navigation.dispatch(DrawerActions.toggleDrawer())
                  }
                  iconStyle={{ margin: 'auto', color: '#000' }}
                  style={{ backgroundColor: '#fff' }}
                />
              ) : (
                <Text></Text>
              )}
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='applyForm'
        options={{
          title: loginState.userToken ? '本を追加' : 'ログイン',
        }}
        component={loginState.userToken ? ApplyForm : AuthScreen}
      />
      <Stack.Screen
        name='edit'
        options={{
          title: '編集',
        }}
        component={EditForm}
      />
      <Stack.Screen
        name='detail'
        options={{
          title: '詳細',
        }}
        component={BookDetail}
      />
      <Stack.Screen
        name='permitForm'
        options={{
          title: '許可',
        }}
        component={PermitForm}
      />
      <Stack.Screen
        name='readForm'
        options={{
          title: '読了',
        }}
        component={ReadForm}
      />
      <Stack.Screen
        name='auth'
        options={{
          title: 'ログイン',
        }}
        component={AuthScreen}
      />
    </Stack.Navigator>
  );
};
