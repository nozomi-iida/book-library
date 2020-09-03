import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IBook } from '../../types/book';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../actions/user';
import { IState } from '../../stores/reduxStore';

type RootStackParamList = {
  apply: { book: IBook };
  edit: { book: IBook };
  permitForm: { book: IBook };
  readForm: { book: IBook };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'apply'>;

type ScreeenNavigationProp = StackNavigationProp<RootStackParamList, 'edit' | 'permitForm' | 'readForm'>

interface Props {
  navigation: ScreeenNavigationProp
  route: ProfileScreenRouteProp;
}

export default function BookDetail({ navigation, route }: Props) {
  const [book, setBook] = useState<IBook>(route.params.book);
  const date = new Date(route.params.book.createdAt);
  const dateMonth = date.getMonth() + 1;
  const dateDate = date.getDate();
  const dateYear = date.getFullYear();
  const user = useSelector((state: IState) => state.user)
  const dispatch = useDispatch();

  const Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    dispatch(fetchUser(token));
  };

  useEffect(() => {
    Boiler();
    setBook(route.params.book);
  }, []);

  const SatusButton = () => {
    if(book.status === '申請中') {
      return (
        <>
          <Button title='許可画面へ' onPress={() => navigation.navigate('permitForm', { book: book })} />
        </>
      )
    } else if (book.status === '許可') {
      return (
        <>
          <Button title='読了画面へ' onPress={() => navigation.navigate('readForm', { book: book })} />
        </>
      ) 
    } else {
      return (
        <>
          
        </>
      ) 
    }
  }

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
          <Text style={{ marginBottom: 20, fontSize: 18 }}>読みたい理由: {book.reason}</Text>
          {user.username === book.username && (
            <>
              <View style={{ marginBottom: 10 }}>
                <Button title='編集' onPress= {() => navigation.navigate('edit', {book: book})}  />
              </View>
            </>
          )}
          <SatusButton />
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
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: .3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 4,
    width: 290,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  text: {
    marginBottom: 10,
    fontSize: 18
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 80,
  },
});
