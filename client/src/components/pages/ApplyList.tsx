import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import FlatList from '../atoms/FlatList';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import { IBook } from '../../types/book';
import Select from '../atoms/Select';
import { useSelector } from 'react-redux';

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
  const books = useSelector((state: any) => state.books);
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
