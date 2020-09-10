import React, { useContext, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { addBook } from '../../actions/book';
import { AuthContext } from '../../stores/authStore';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

type FormData = {
  title: string;
  url: string;
  description: string;
  reason: string;
};

type RootStackParamList = {
  apply: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'apply'>;

type Props = {
  navigation: NavigationProp;
};

export default function ApplyForm({ navigation }: Props) {
  const { control, setValue, handleSubmit, errors } = useForm<FormData>();
  const {loginState, authDispatch} = useContext(AuthContext);
  const dispatch = useDispatch();
  const Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    if(token) {
      try {
        const { data } = await axios.get(
          'https://frozen-bastion-73398.herokuapp.com/user',
          {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        );
        authDispatch({ type: 'FETCH_USER', data: data });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    Boiler();
  }, []);
  const onSubmit = ({ title, description, reason, url }: FormData) => {
    const book = {
      username: loginState.username,
      title,
      description,
      reason,
      url,
      status: '申請中',
      review: 1,
      affiliateUrl: '',
    };
    dispatch(addBook(book));
    navigation.navigate('apply');
    setValue('title', '');
    setValue('url', '');
    setValue('description', '');
    setValue('reason', '');
  };

  return (
    <View>
      <Text>タイトル*</Text>
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
        name='title'
        rules={{ required: true }}
        defaultValue=''
      />
      <View style={styles.errContainer}>
        {errors.title && (
          <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
        )}
      </View>

      <Text>AmazonのURL*</Text>
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
        name='url'
        rules={{ required: true }}
        defaultValue=''
      />
      <View style={styles.errContainer}>
        {errors.url && (
          <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
        )}
      </View>

      <Text>本の簡単な詳細*</Text>
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
        name='description'
        rules={{ required: true }}
        defaultValue=''
      />
      <View style={styles.errContainer}>
        {errors.description && (
          <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
        )}
      </View>

      <Text>読みたい理由*</Text>
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
        name='reason'
        rules={{ required: true }}
        defaultValue=''
      />
      <View style={styles.errContainer}>
        {errors.reason && (
          <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
        )}
      </View>

      <Button
        title='申請する'
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
