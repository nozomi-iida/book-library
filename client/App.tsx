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
import ApplyList from './src/components/pages/ApplyList';
import BookDetail from './src/components/pages/BookDetail';
import EditForm from './src/components/pages/EditForm';
import FlatListBasics from './src/components/atoms/FlatList';
import reduxStore from './src/stores/reduxStore';
import { Provider, useDispatch } from 'react-redux';
import { fetchBook } from './src/components/actions/book';

const Stack = createStackNavigator();

const MainScreen = () => {
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBook());
  }, [dispatch])
  return (
    <Tab.Navigator>
      <Tab.Screen name='Apply' component={ApplyList} />
      <Tab.Screen name='Permit' component={Permit} />
      <Tab.Screen name='Read' component={Read} />
    </Tab.Navigator>
  );
};

const store = reduxStore();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Loading' component={Loading} />
          <Stack.Screen name='新規登録' component={SignUp} />
          <Stack.Screen name='ログイン' component={SignIn} />
          <Stack.Screen name='Main' component={MainScreen} />
          <Stack.Screen name='申し込みフォーム' component={ApplyForm} />
          <Stack.Screen name='編集' component={EditForm} />
          <Stack.Screen name='詳細' component={BookDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
