import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

interface IUserElement {
  email: string,
  username: string,
}

const initialState: IUserElement = {
  email: '',
  username: '',
};

export const UserStore = createContext<IUserElement>(initialState);

export const UserProvider = ({ children }: JSX.ElementChildrenAttribute) => {
  const [user, setUser] = useState(initialState);
  console.log(user);
  const Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get('http://192.168.0.22:8000/user/', {
      // .get('http://localhost:8000/user/', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then(res => setUser(res.data))
      .catch(error => console.log('Error: ' + error));
  };

  useEffect(() => {
      Boiler();
      console.log('hello');
  }, []);

  return <UserStore.Provider value={user}>{children}</UserStore.Provider>;
};
