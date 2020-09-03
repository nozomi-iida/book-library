import React, { useEffect, useState } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch } from 'react-redux';
import { updateBook } from '../../actions/book';
import { fetchUser } from '../../actions/user';
import { IBook } from '../../types/book';
import { RouteProp } from '@react-navigation/native';
import { AirbnbRating } from 'react-native-ratings';

type FormData = {
  review: number;
};

type RootStackParamList = {
  apply: undefined;
  detail: { book: IBook };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'detail'>;

type NavigationProp = StackNavigationProp<RootStackParamList, 'apply'>;

type Props = {
  navigation: NavigationProp;
  route: ProfileScreenRouteProp;
};

export default function ReadForm({ navigation, route }: Props) {
  const { control, handleSubmit, errors } = useForm<FormData>();
  const [book, setBook] = useState<IBook>(route.params.book);
  const dispatch = useDispatch();

  const Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    dispatch(fetchUser(token));
  };

  useEffect(() => {
    Boiler();
  }, []);

  const onSubmit = ({ review }: FormData) => {
    const newBook = {
      username: book.username,
      title: book.title,
      description: book.description,
      reason: book.reason,
      url: book.url,
      status: '読了',
      review,
      affiliateUrl: book.affiliateUrl,
    };
    dispatch(updateBook(book._id, newBook));
    navigation.navigate('apply');
  };

  return (
    <View>
      <Text>おすすめ度*</Text>
      <Controller
        control={control}
        render={({ onChange }) => (
          <AirbnbRating
            showRating={false}
            onFinishRating={value => onChange(value)}
            defaultRating={0}
          />
        )}
        name='review'
        rules={{ required: true }}
        defaultValue=''
      />
      <View style={styles.errContainer}>
        {errors.review && (
          <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
        )}
      </View>

      <Button title='読了' onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#0e101c',
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  errContainer: {
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
