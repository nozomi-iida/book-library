import React, { useState, useContext } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../stores/authStore';

type FormData = {
  email: string;
  password: string;
};

type RootStackParamList = {
  signUp: undefined;
  main: undefined;
};

type SignUpScreeenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'signUp' | 'main'
>;

type Props = {
  navigation: SignUpScreeenNavigationProp;
};

export default function SignIn({ navigation }: Props) {
  const { control, handleSubmit, errors } = useForm<FormData>();
  const [signInErr, setSignInErr] = useState(false);
  const { authDispatch } = useContext(AuthContext);
  const onSubmit = async ({ email, password }: FormData) => {
    fetch('http://192.168.0.22:8000/user/signin', {
      // fetch('http://localhost:8000/user/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(res => res.json())
      .then(async data => {
        if (data.token) {
          await AsyncStorage.setItem('token', data.token);
          authDispatch({ type: 'SIGNIN', id: email, token: data.token });
        } else {
          console.log('hello')
          console.log(data.error);
          setSignInErr(true);
        }
      });
  };

  return (
    <View>
      <View style={styles.errContainer}>
        {signInErr && (
          <Text style={{ color: '#FF0000' }}>
            パスワードまたはメールアドレスが違います。
          </Text>
        )}
      </View>
      <Text>メールアドレス*</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            onChange={() => setSignInErr(false)}
          />
        )}
        name='email'
        rules={{ required: true }}
        defaultValue=''
      />
      <View style={styles.errContainer}>
        {errors.email && (
          <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
        )}
      </View>

      <Text>パスワード*</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            onChange={() => setSignInErr(false)}
            secureTextEntry={true}
          />
        )}
        name='password'
        rules={{ required: true }}
        defaultValue=''
      />
      <View style={styles.errContainer}>
        {errors.password && (
          <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
        )}
      </View>

      <Button
        title='ログイン'
        onPress={handleSubmit(onSubmit)}
        color='#f194ff'
      />
      <TouchableOpacity
        style={{ marginTop: 10 }}
        onPress={() => navigation.navigate('signUp')}
      >
        <Text>アカウントを作成しますか？</Text>
      </TouchableOpacity>
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
