import React, { useState } from 'react';
import { View, Button, Text, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IBook } from '../../types/book';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IState } from '../../stores/reduxStore';
import { signOutuser } from '../../actions/user';
import { AirbnbRating } from 'react-native-ratings';
import book from '../../reducers/book';

type RootsStackParamList = {
  applyForm: undefined;
  detail: { book: IBook } | undefined;
  signIn: undefined;
};

type ScreenNavigationProps = StackNavigationProp<
  RootsStackParamList,
  'applyForm' | 'detail' | 'signIn'
>

type Props = {
  navigation: ScreenNavigationProps
}

export default function Apply({navigation}: Props) {
  const books = useSelector((state: IState) => state.books);
  const readBooks: IBook[] = []
  const dispatch =useDispatch();
  const logout = () => {
    dispatch(signOutuser());
    navigation.replace('signIn');
  };

  books.map((book: IBook) => {
    if(book.status === '読了') {
      readBooks.push(book);
    }
  })

  return (
    <View>
      <FlatList
        data={readBooks}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => navigation.navigate('detail', {book: item})}
          >
            <View style={styles.cell}>
                <Text style={styles.item}>{item.title}</Text>
                <AirbnbRating
                  showRating={false}
                  defaultRating={item.review}
                  isDisabled={false}
                  size={20}
                />
            </View>
          </TouchableOpacity>
        )}
      />
      <Button title='ログアウト' onPress={() => logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
  },
  cell: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
    borderBottomColor: '#bbb',
  },
});