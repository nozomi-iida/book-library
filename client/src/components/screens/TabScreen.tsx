import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch } from 'react-redux';
import { fetchBook } from '../../actions/book';
import Apply from '../pages/Apply';
import Read from '../pages/Read';
import Permit from '../pages/Permit';

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
          title: '申請',
        }}
        component={Apply}
      />
      <Tab.Screen
        name='permit'
        options={{
          title: '許可',
        }}
        component={Permit}
      />
      <Tab.Screen
        name='read'
        options={{
          title: '読了',
        }}
        component={Read}
      />
    </Tab.Navigator>
  );
}

