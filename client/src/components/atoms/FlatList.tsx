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
  申し込みフォーム: undefined;
  詳細: undefined;
};

type ScreenNavigationProps = StackNavigationProp<
  RootsStackParamList,
  '申し込みフォーム' | '詳細'
>

interface FlatListProps {
  data: IBook[];
  navigation: any;
}

const FlatListBasics = ({ data, navigation }: FlatListProps) => {
  console.log(data);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.cell}>
            <TouchableOpacity
              style={{ width: '100%' }}
              onPress={() => navigation.navigate('詳細', {book: item})}
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
