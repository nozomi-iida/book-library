import { Dispatch } from 'redux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const fetchUser = (token: any) => async (dispatch: Dispatch) => {
  try {
    const {
      data,
    } = await axios.get('https://frozen-bastion-73398.herokuapp.com/user/', {
      headers: { Authorization: 'Bearer ' + token },
    });
    dispatch({ type: 'FETCH_USER', user: data });
  } catch (error) {
    console.log(error);
  }
};

export const signOutuser = () => async (dispatch: Dispatch) => {
  try {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'SIGNOUT_USER' });
  } catch (error) {
    console.log(error);
  }
};
