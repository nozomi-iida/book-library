import React, { useState } from 'react';
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

type FormData = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type RootStackParamList = {
  ログイン: undefined;
  Main: undefined;
};

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ログイン' | 'Main'
>;

type Props = {
  navigation: SignInScreenNavigationProp;
};

export default function SignUp({ navigation }: Props) {
  const { control, handleSubmit, errors } = useForm<FormData>();
  const [passwordErr, setPaswordErr] = useState(false);
  const onSubmit = async ({ username, email, password, passwordConfirm }: FormData) => {
    if(password === passwordConfirm) {
      fetch('http://localhost:8000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })
        .then(res => res.json())
        .then(async data => {
          console.log(data);
          try {
            await AsyncStorage.setItem('token',data.token)
            navigation.replace('Main')
          } catch (error) {
            console.log("error:",error)
          }
        });
    } else {
      setPaswordErr(true)
    }
  };

  return (
    <View>
      <Text>名前*</Text>
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
        name='username'
        rules={{ required: true }}
        defaultValue=''
      />
      <View style={styles.errContainer}>
        {errors.username && (
          <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
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
          />
        )}
        name='email'
        rules={{ required: true, pattern: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ }}
        defaultValue=''
      />
      <View style={styles.errContainer}>
        {errors.email &&errors.email.type === 'required' && (
          <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
        )}
        {errors.email &&errors.email.type === 'pattern' && (
          <Text style={{ color: '#FF0000' }}>メールアドレスが正しくありません。</Text>
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
            secureTextEntry={true}  
          />
        )}
        name='password'
        rules={{ required: true, minLength: 6 }}
        defaultValue=''
      />
      <View style={styles.errContainer}>
        {errors.password &&errors.password.type === 'required' && (
          <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
        )}
        {errors.password &&errors.password.type === 'minLength' && (
          <Text style={{ color: '#FF0000' }}>パスワードは6文字以上設定してください。</Text>
        )}
      </View>

      <Text>パスワード(確認用)*</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            onChange={() => setPaswordErr(false)}
            secureTextEntry={true}  
          />
        )}
        name='passwordConfirm'
        rules={{ required: true, minLength: 6 }}
        defaultValue=''
      />
      <View style={styles.errContainer}>
        {errors.passwordConfirm && errors.passwordConfirm.type === 'required' && (
          <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
        )}
        {passwordErr && <Text style={{ color: '#FF0000' }}>パスワードが違います。</Text>}
      </View>

      <Button
        title='新規登録'
        onPress={handleSubmit(onSubmit)}
        color='#f194ff'
      />
      <TouchableOpacity
        style={{ marginTop: 10 }}
        onPress={() => navigation.navigate('ログイン')}
      >
        <Text>アカウントを既に持っていますか？</Text>
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
