import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootsStackParamList = {
  signIn: undefined;
  signUp: undefined;
};

type ScreenNavigationProps = StackNavigationProp<
  RootsStackParamList,
  'signIn' | 'signUp'
>

type Props = {
  navigation: ScreenNavigationProps
}


export default function Home({ navigation }: Props) {
  return (
    <ImageBackground
      source={require('../../images/cv-library.jpg')}
      style={styles.image}
    >
      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: 'bold', textAlign: 'center'}}>
            ようこそ！
          </Text>
          <Text style={{ fontSize: 30, marginBottom: 40, fontWeight: 'bold' }}>
            CV libraryへ！！
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: 20 }}>
            <Button
              title='新規登録'
              onPress={() => navigation.navigate('signUp')}
            />
          </View>
          <Button
            title='ログイン'
            onPress={() => navigation.navigate('signIn')}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.5)',
  },
});
