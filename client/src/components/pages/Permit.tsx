import React, { useState } from 'react';
import { View, Button, Text, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IBook } from '../../types/book';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IState } from '../../stores/reduxStore';
import { signOutuser } from '../../actions/user';

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
  const permitBooks: IBook[] = []
  const dispatch =useDispatch();
  const logout = () => {
    dispatch(signOutuser());
    navigation.replace('signIn');
  };

  books.map((book: IBook) => {
    if(book.status === '許可') {
      permitBooks.push(book);
    }
  })

  return (
    <View>
      <FlatList
        data={permitBooks}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => navigation.navigate('detail', {book: item})}
          >
            <View style={styles.cell}>
                <Text style={styles.item}>{item.title}</Text>
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