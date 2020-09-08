import React, { useEffect, useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabScreen from './TabScreen';
import { View } from 'react-native';
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

const Stack = createStackNavigator();

export default ({ navigation }: any) => {
  const {authDispatch} = useContext(AuthContext);
  const Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const { data } = await axios.get('https://frozen-bastion-73398.herokuapp.com/user', {
        headers: { 
          'Authorization': 'Bearer ' + token },
      });
      authDispatch({ type: 'FETCH_USER', data: data });
    } catch (error) {
      console.log(error);
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
          title: 'Eazii Library',
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name='menuunfold'
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
                iconStyle={{ margin: 'auto', color: '#000' }}
                style={{ backgroundColor: '#fff' }}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='applyForm'
        options={{
          title: '新規登録',
        }}
        component={ApplyForm}
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
    </Stack.Navigator>
  );
};
