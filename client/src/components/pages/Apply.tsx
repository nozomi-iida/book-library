import React from 'react';
import { View, Button, Text, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IBook } from '../../types/book';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IState } from '../../stores/reduxStore';
import { Icon } from 'react-native-elements';
import AddIcon from '../atoms/AddIcon';

type RootsStackParamList = {
  applyForm: undefined;
  detail: { book: IBook } | undefined;
};

type ScreenNavigationProps = StackNavigationProp<
  RootsStackParamList,
  'applyForm' | 'detail'
>;

type Props = {
  navigation: ScreenNavigationProps;
};

export default function Apply({ navigation }: Props) {
  const books = useSelector((state: IState) => state.books);
  const applyBooks: IBook[] = [];
  books.map((book: IBook) => {
    if (book.status === '申請中') {
      applyBooks.push(book);
    }
  });

  return (
    <View style={{height: '100%'}}>
      <FlatList
        data={applyBooks}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => navigation.navigate('detail', { book: item })}
          >
            <View style={styles.cell}>
              <Text numberOfLines={1} ellipsizeMode='tail' style={styles.item}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <AddIcon navigation={navigation} />
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
  icon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  }
});
