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
import reduxStore from './src/stores/reduxStore';
import { Provider, useDispatch } from 'react-redux';
import { fetchBook } from './src/actions/book';
import PermitForm from './src/components/pages/PermitForm';
import { Button, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './src/components/pages/DrawerContent';
import ReadForm from './src/components/pages/ReadForm';

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

const DrawerScreen = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name='main' component={MainScreen} />
    </Drawer.Navigator>
  );
};

const store = reduxStore();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
            name='Drawer'
            component={DrawerScreen}
            options={{
              title: 'Eazii Library',
              headerLeft: () => (
                <View style={{ marginLeft: 10 }}>
                  <Icon.Button
                    name='menuunfold'
                    onPress={() => alert('This is a button!')}
                    iconStyle={{ margin: 'auto', color: '#000' }}
                    style={{ backgroundColor: '#fff' }}
                  />
                </View>
              ),
            }}
          /> */}
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
          <Stack.Screen
            name='readForm'
            options={{
              title: '読了',
            }}
            component={ReadForm}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
