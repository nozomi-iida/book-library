import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Linking, Image, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IBook } from '../../types/book';
import { AuthContext } from '../../stores/authStore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import asinMatcher from 'asin-matcher';

type RootStackParamList = {
  apply: { book: IBook };
  edit: { book: IBook };
  readForm: { book: IBook };
  bookInfo: { book: IBook };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'apply'>;

type ScreeenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'edit'  | 'readForm' | 'bookInfo'
>;

interface Props {
  navigation: ScreeenNavigationProp;
  route: ProfileScreenRouteProp;
}

export default function BookDetail({ navigation, route }: Props) {
  const book = route.params.book;
  const date = new Date(route.params.book.createdAt);
  const dateMonth = date.getMonth() + 1;
  const dateDate = date.getDate();
  const dateYear = date.getFullYear();
  const { loginState } = useContext(AuthContext);
  const asin = asinMatcher.getAsin(book.url);
  return (
    <View style={styles.container}>
      {book && (
        <>
          <View
            style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}
          >
            <Image
              source={{
                uri: `http://images-jp.amazon.com/images/P//${asin}.09.LZZZZZZZ`,
              }}
              style={{ width: '40%', height: 180 }}
            />
            <View style={{ width: '60%', marginLeft: 10 }}>
              <Text style={styles.title}>{book.title}</Text>
              <Text style={styles.text}>作成者: {book.username}</Text>
              <Text style={styles.text}>
                作成日: {dateYear}-{dateMonth}-{dateDate}
              </Text>
            </View>
          </View>
          <Button
            onPress={() => Linking.openURL(book.affiliateUrl)}
            title='本を購入する'
          />
          <Text style={styles.detail}>本の簡単な詳細</Text>
          <Text numberOfLines={4} style={styles.info}>
            {book.description}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('bookInfo', { book: book })
            }
          >
            <Text style={{ textAlign: 'right' }}>全文を読む</Text>
          </TouchableOpacity>
          <Text style={styles.detail}>読みたい理由: </Text>
          <Text numberOfLines={4} style={styles.info}>
            {book.reason}
          </Text>
          {loginState.username === book.username && (
            <>
              <View style={{ marginBottom: 10 }}>
                <Button
                  title='編集'
                  onPress={() => navigation.navigate('edit', { book: book })}
                />
              </View>
            </>
          )}
          {book.status === '読書中' &&
            loginState.username === book.username && (
              <Button
                title='読了画面へ'
                onPress={() => navigation.navigate('readForm', { book: book })}
              />
            )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 4,
    width: 290,
    // paddingHorizontal: 40,
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 40,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 10,
    fontSize: 18,
    color: '#666666',
  },
  info: {
    marginBottom: 10,
    fontSize: 18,
  },
  detail: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 80,
  },
});
