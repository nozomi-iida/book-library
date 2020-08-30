import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { IBook } from '../../types/book';

type RootStackParamList = {
  Apply: { book: IBook };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Apply'>;

interface Props {
  route: ProfileScreenRouteProp;
}

export default function BookDetail({ route }: Props) {
  const [book, setBook] = useState<IBook>();
  const [date, setDate] = useState(new Date());
  const dateMonth = date.getMonth() + 1;
  const dateDate = date.getDate();
  const dateYear = date.getFullYear();
  useEffect(() => {
    setBook(route.params.book,);
    setDate(new Date(route.params.book.createdAt));
  }, []);

  return (
    <View style={styles.container}>
      {book && (
        <View style={styles.card}>
          <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: 'center', marginBottom: 10}}>{book.status}</Text>
          <Text style={styles.text}>申請した人: {book.username}</Text>
          <Text style={styles.text}>申請日: {dateYear}-{dateMonth}-{dateDate}</Text>
          <Text style={styles.text}>タイトル: {book.title}</Text>
          <Text style={styles.text}>本の簡単な詳細: {book.description}</Text>
          <Text style={styles.text}>読みたい理由: {book.reason}</Text>
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
    marginBottom: 10
  }
});
