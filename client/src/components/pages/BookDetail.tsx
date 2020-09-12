import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Linking, Image, Button } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IBook } from '../../types/book';
import { AuthContext } from '../../stores/authStore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import asinMatcher from 'asin-matcher';

type RootStackParamList = {
  apply: { book: IBook };
  edit: { book: IBook };
  permitForm: { book: IBook };
  readForm: { book: IBook };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'apply'>;

type ScreeenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'edit' | 'permitForm' | 'readForm'
>;

interface Props {
  navigation: ScreeenNavigationProp;
  route: ProfileScreenRouteProp;
}

export default function BookDetail({ navigation, route }: Props) {
  const [book, setBook] = useState<IBook>(route.params.book);
  const date = new Date(route.params.book.createdAt);
  const dateMonth = date.getMonth() + 1;
  const dateDate = date.getDate();
  const dateYear = date.getFullYear();
  const { loginState } = useContext(AuthContext);
  const asin = asinMatcher.getAsin(book.url);
  return (
    <View style={styles.container}>
      {book && (
        <View style={styles.card}>
          <Image
            source={{
              uri: `http://images-jp.amazon.com/images/P//${asin}.09.LZZZZZZZ`,
            }}
            style={{ width: 210, height: 270 }}
          />
          <Text style={styles.text}>作成者: {book.username}</Text>
          <Text style={styles.text}>
            作成日: {dateYear}-{dateMonth}-{dateDate}
          </Text>
          <Text style={styles.text}>タイトル: {book.title}</Text>
          <Text style={styles.text}>本の簡単な詳細: {book.description}</Text>
          <Text style={styles.text}>読みたい理由: {book.reason}</Text>
          <Button
            onPress={() => Linking.openURL(book.affiliateUrl)}
            title='本を購入する'
          />
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
          {book.status === '申請中' && (
            <Button
              title='読了画面へ'
              onPress={() => navigation.navigate('readForm', { book: book })}
            />
          )}
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
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 4,
    width: 290,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  text: {
    marginBottom: 10,
    fontSize: 18,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: 80,
  },
});
