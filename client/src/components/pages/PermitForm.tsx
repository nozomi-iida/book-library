import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { updateBook } from '../../actions/book';
import { IBook } from '../../types/book';
import { RouteProp } from '@react-navigation/native';

type FormData = {
  affiliateUrl: string;
};

type RootStackParamList = {
  permit: undefined;
  detail: { book: IBook };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'detail'>;

type NavigationProp = StackNavigationProp<RootStackParamList, 'permit'>;

type Props = {
  navigation: NavigationProp;
  route: ProfileScreenRouteProp;
};

export default function PermitForm({ navigation, route }: Props) {
  const { control, handleSubmit, errors } = useForm<FormData>();
  const [book, setBook] = useState<IBook>(route.params.book);
  const dispatch = useDispatch();

  const onSubmit = ({ affiliateUrl }: FormData) => {
    const newBook = {
      username: book.username,
      title: book.title,
      description: book.description,
      reason: book.reason,
      url: book.url,
      status: '許可',
      review: 1,
      affiliateUrl,
    }; 
    dispatch(updateBook(book._id, newBook));
    navigation.navigate('permit')
  };

  return (
    <View>
      <Text>アフェリエイトURL*</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name='affiliateUrl'
        rules={{ required: true }}
        defaultValue=''
      />
      <View style={styles.errContainer}>
        {errors.affiliateUrl && (
          <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
        )}
      </View>

      <Button
        title='許可する'
        onPress={handleSubmit(onSubmit)}
      />
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
