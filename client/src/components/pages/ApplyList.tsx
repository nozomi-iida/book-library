import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import FlatList from '../atoms/FlatList';
import axios from 'axios';
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

type Props = {
  navigation: ScreenNavigationProps
}

export default function ApplyList({navigation}: Props) {
  const [books, setBooks] = useState<IBook[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/book/getApply')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View>
      <Button 
        title='本を申し込む'
        onPress={() => navigation.navigate('申し込みフォーム')}
      />
      <FlatList data={books} navigation={navigation}/>
    </View>
  );
}
