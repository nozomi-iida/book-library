import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from './src/components/pages/SignIn';
import SignUp from './src/components/pages/SignUp';
import { createStackNavigator } from '@react-navigation/stack';
import ApplyForm from './src/components/pages/ApplyForm';
import Permit from './src/components/pages/Permit';
import Loading from './src/components/pages/Loading';
import Read from './src/components/pages/Read';
import Apply from './src/components/pages/Apply';
import BookDetail from './src/components/pages/BookDetail';
import EditForm from './src/components/pages/EditForm';
import FlatListBasics from './src/components/atoms/FlatList';
import reduxStore from './src/stores/reduxStore';
import { Provider, useDispatch } from 'react-redux';
import { fetchBook } from './src/actions/book';
import PermitForm from './src/components/pages/PermitForm';

const Stack = createStackNavigator();

const MainScreen = () => {
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
};

const store = reduxStore();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Loading'
            options={{
              title: '',
            }}
            component={Loading}
          />
          <Stack.Screen
            name='signUp'
            options={{
              title: '新規登録',
            }}
            component={SignUp}
          />
          <Stack.Screen
            name='signIn'
            options={{
              title: 'ログイン',
            }}
            component={SignIn}
          />
          <Stack.Screen
            name='main'
            options={{
              title: 'Eazii Library',
            }}
            component={MainScreen}
          />
          <Stack.Screen
            name='applyForm'
            options={{
              title: '申請フォーム',
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
