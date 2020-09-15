import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView, 
  ActivityIndicator
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../../stores/authStore';
import { askAsync, CAMERA_ROLL } from 'expo-permissions';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';

type FormData = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type RootStackParamList = {
  signIn: undefined;
  main: undefined;
};

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'signIn' | 'main'
>;

type Props = {
  navigation: SignInScreenNavigationProp;
};

export default function SignUp({ navigation }: Props) {
  const { control, handleSubmit, errors } = useForm<FormData>();
  const [passwordErr, setPaswordErr] = useState(false);
  const { authDispatch } = useContext(AuthContext);
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await askAsync(CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };
  useEffect(() => {
    getPermissionAsync();
  }, []);
  const _pickImage = async () => {
    try {
      let result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [5, 5],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit = async ({
    username,
    email,
    password,
    passwordConfirm,
  }: FormData) => {
    setLoading(false)
    if (password === passwordConfirm) {
      // fetch('https://frozen-bastion-73398.herokuapp.com/user/signup', {
      // fetch('http://localhost:8000/user/signup', {
      fetch('http://192.168.0.22:8000/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          image,
          email,
          password,
        }),
      })
        .then(res => res.json())
        .then(async data => {
          try {
            await AsyncStorage.setItem('token', data.token);
            authDispatch({ type: 'SIGNIN', id: email, token: data.token });
          } catch (error) {
            console.log('error:', error);
          }
          setLoading(true)
        });
    } else {
      setPaswordErr(true);
    }
  };

  return (
    <KeyboardAvoidingView style={{paddingHorizontal: 10}} behavior='padding'>
      <ScrollView>
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
          <Text>画像*</Text>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={_pickImage}>
              <Image
                // source={{
                //   uri: image ? image : require('../../images/noImage.jpeg'),
                // }}
                source={
                  image ? { uri: image } : require('../../images/noImage.jpeg')
                }
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                  backgroundColor: '#fff',
                }}
              />
            </TouchableOpacity>
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
            rules={{
              required: true,
              pattern: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            }}
            defaultValue=''
          />
          <View style={styles.errContainer}>
            {errors.email && errors.email.type === 'required' && (
              <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <Text style={{ color: '#FF0000' }}>
                メールアドレスが正しくありません。
              </Text>
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
            {errors.password && errors.password.type === 'required' && (
              <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <Text style={{ color: '#FF0000' }}>
                パスワードは6文字以上設定してください。
              </Text>
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
            {errors.passwordConfirm &&
              errors.passwordConfirm.type === 'required' && (
                <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
              )}
            {passwordErr && (
              <Text style={{ color: '#FF0000' }}>パスワードが違います。</Text>
            )}
          </View>
          {loading ? (
            <Button
              title='新規登録'
              onPress={handleSubmit(onSubmit)}
              color='#f194ff'
            />

          ) : (
            <ActivityIndicator />
          )}
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => navigation.navigate('signIn')}
          >
            <Text>アカウントを既に持っていますか？</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
