import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import FlatList from '../atoms/FlatList';
import axios from 'axios';

interface IBook {
  _id: string;
  createdAt: string;
  description: string;
  reason: string;
  review: number;
  status: string;
  title: string;
  updatedAt: string;
  url: string;
  username: string;
}

export default function ApplyList() {
  const [books, setBooks] = useState<IBook[]>([]);
  const booksData = books.map(book => {
    return {
      id: book._id,
      title: book.title,
    };
  });

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
      <FlatList data={booksData} />
    </View>
  );
}
