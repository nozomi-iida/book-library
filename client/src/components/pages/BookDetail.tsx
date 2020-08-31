import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IBook } from '../../types/book';
import { UserStore } from '../../stores/user';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

type RootStackParamList = {
  Apply: { book: IBook };
  編集: { book: IBook };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Apply'>;

type ScreeenNavigationProp = StackNavigationProp<RootStackParamList, '編集'>

interface Props {
  navigation: ScreeenNavigationProp
  route: ProfileScreenRouteProp;
}

export default function BookDetail({ navigation, route }: Props) {
  const [book, setBook] = useState<IBook>();
  const date = new Date(route.params.book.createdAt);
  const dateMonth = date.getMonth() + 1;
  const dateDate = date.getDate();
  const dateYear = date.getFullYear();
  const [user, setUser] = useState({username: '', email: ''});
  const Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get('http://localhost:8000/user/', {
      // .get('http://192.168.0.22:8000/user/', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then(res => setUser(res.data))
      .catch(error => console.log('Error: ' + error));
  };

  useEffect(() => {
    Boiler();
    setBook(route.params.book);
  }, []);

  const deleteBook = () => {
    console.log('hello');
  };

  return (
    <View style={styles.container}>
      {book && (
        <View style={styles.card}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 30,
              textAlign: 'center',
              marginBottom: 10,
            }}
          >
            {book.status}
          </Text>
          <Text style={styles.text}>申請した人: {book.username}</Text>
          <Text style={styles.text}>
            申請日: {dateYear}-{dateMonth}-{dateDate}
          </Text>
          <Text style={styles.text}>タイトル: {book.title}</Text>
          <Text style={styles.text}>本の簡単な詳細: {book.description}</Text>
          <Text style={{ marginBottom: 20 }}>読みたい理由: {book.reason}</Text>
          {user.username === book.username && (
            <>
              <View style={{ marginBottom: 10 }}>
                <Button title='編集' onPress= {() => navigation.navigate('編集', {book: book})}  />
              </View>
            </>
          )}
          <Button title='許可する' onPress={deleteBook} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: '#bbb',
    shadowColor: 'rgba(0,0,0,0.26)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: 290,
  },
  text: {
    marginBottom: 10,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 80,
  },
});
