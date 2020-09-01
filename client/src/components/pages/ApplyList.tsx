import React from 'react';
import { View, Button, Text, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IBook } from '../../types/book';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

type RootsStackParamList = {
  申し込みフォーム: undefined;
  詳細: { book: IBook } | undefined;
};

type ScreenNavigationProps = StackNavigationProp<
  RootsStackParamList,
  '申し込みフォーム' | '詳細'
>

type Props = {
  navigation: ScreenNavigationProps
}

export default function ApplyList({navigation}: Props) {
  const books = useSelector((state: any) => state.books);
  return (
    <View>
      <Button 
        title='本を申し込む'
        onPress={() => navigation.navigate('申し込みフォーム')}
      />
      <FlatList
        data={books}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={() => navigation.navigate('詳細', {book: item})}
          >
            <View style={styles.cell}>
                <Text style={styles.item}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
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