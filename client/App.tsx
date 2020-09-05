import React, { useEffect, useMemo, useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SignIn from './src/components/pages/SignIn';
import SignUp from './src/components/pages/SignUp';
import { createStackNavigator } from '@react-navigation/stack';
import reduxStore from './src/stores/reduxStore';
import { Provider } from 'react-redux';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './src/components/pages/DrawerContent';
import { AuthContext } from './src/stores/authStore';
import authReducer from './src/reducers/auth';
import MainScreen from './src/components/screens/MainScreen';

const Stack = createStackNavigator();

const store = reduxStore();

export default function App() {
  const initialLoginState = {
    isLoading: true,
    email: '',
    username: '',
    userToken: '',
  };
  const Drawer = createDrawerNavigator();
  const [loginState, authDispatch] = useReducer(authReducer, initialLoginState);
  const authContext = useMemo(
    () => ({
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('token');
        } catch (error) {
          console.log(error);
        }
        authDispatch({ type: 'SIGNOUT' });
      }
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('token');
      } catch (error) {
        console.log(error);
      }

      authDispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={{ authContext, loginState, authDispatch: authDispatch }}>
      <Provider store={store}>
        <NavigationContainer>
          {loginState.userToken ? (
            <Drawer.Navigator
              drawerContent={props => <DrawerContent {...props} />}
            >
              <Drawer.Screen name='main' component={MainScreen} />
            </Drawer.Navigator>
          ) : (
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
          )}
        </NavigationContainer>
      </Provider>
    </AuthContext.Provider>
  );
}
