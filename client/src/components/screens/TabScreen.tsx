import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';
import { fetchBook } from '../../actions/book';
import Apply from '../pages/Apply';
import Read from '../pages/Read';
import Icon from 'react-native-vector-icons/Entypo';

export default function TabScreen() {
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBook());
  }, [dispatch]);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='apply'
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              size={28}
              name='open-book'
              color={focused ? '#007AFF' : '#8F8D8E'}
            />
          ),
          title: '読書中',
        }}
        component={Apply}
      />
      <Tab.Screen
        name='read'
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              size={28}
              name='book'
              color={focused ? '#007AFF' : '#8F8D8E'}
            />
          ),
          title: '読了',
        }}
        component={Read}
      />
    </Tab.Navigator>
  );
}
