import React from 'react';
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { control, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = (data: FormData) => console.log(data);

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 32, margin: 10 }}>
        ログイン
      </Text>
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
      <TouchableOpacity style={{ marginTop: 10 }}>
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
