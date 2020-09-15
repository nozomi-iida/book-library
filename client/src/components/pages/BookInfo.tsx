import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IBook } from '../../types/book';

type RootStackParamList = {
  detail: { book: IBook };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'detail'>;

interface Props {
  route: ProfileScreenRouteProp;
}

export default function BookInfo({ route }: Props) {
  const book = route.params.book;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{book.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    paddingVertical: 10,
    lineHeight: 25,
  }
})