import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IBook } from '../../types/book';

type RootsStackParamList = {
  applyForm: undefined;
  detail: { book: IBook } | undefined;
};

type ScreenNavigationProps = StackNavigationProp<
  RootsStackParamList,
  'applyForm' | 'detail'
>

interface FlatListProps {
  data: IBook[];
  navigation: ScreenNavigationProps;
}

const FlatListBasics = ({ data, navigation }: FlatListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.cell}>
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => navigation.navigate('detail', {book: item})}
            >
              <Text style={styles.item}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

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

export default FlatListBasics;
