import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IBook } from '../../types/book';

type RootStackParamList = {
  detail: { book: IBook, tag: 'detail' | 'reason' };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'detail'>;

interface Props {
  route: ProfileScreenRouteProp;
}

export default function BookInfo({ route }: Props) {
  const book = route.params.book;
  const tag = route.params.tag
  return (
    <View style={styles.container}>
      {tag === 'detail' &&  <Text style={styles.text}>{book.description}</Text>}
      {tag === 'reason' && <Text style={styles.text}>{book.reason}</Text>}
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