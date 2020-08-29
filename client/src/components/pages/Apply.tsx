import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

type FormData = {
  title: string;
  url: string;
  description: string;
  reason: string;
};

type RootStackParamList = {
  Permit: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Permit'>;

type Props = {
  navigation: NavigationProp;
};

export default function Apply({ navigation }: Props) {
  const { control, handleSubmit, errors } = useForm<FormData>();
  const [username, setUsername] = useState('');
  const Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get('http://localhost:8000/user/', {
        headers: { Authorization: 'Bearer ' + token },
      })
      .then(res => setUsername(res.data.username))
      .catch(error => console.log('Error: ' + error));
  };
  useEffect(() => {
    Boiler();
  }, []);
  const onSubmit = ({ title, description, reason, url }: FormData) => {
    const apply = {
      username,
      title,
      description,
      reason,
      url,
      status: 'apply',
      review: 1,
    };
    axios
      .post('http://localhost:8000/book/addApply', apply)
      .then(res => {
        res.data;
        navigation.navigate('Permit');
      })
      .catch(error => console.log(error));
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
        color='#f194ff'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
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
