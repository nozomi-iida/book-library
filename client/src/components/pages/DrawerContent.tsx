import React, { useContext } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../../stores/authStore';
import { DrawerActions } from '@react-navigation/native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Avatar } from 'react-native-elements';
export default function DrawerContent({
  navigation,
}: DrawerContentComponentProps) {
  const { loginState, authContext } = useContext(AuthContext);
  const onsignOutPress = () => {
    authContext.signOut();
    navigation.dispatch(DrawerActions.closeDrawer());
  };
  return (
    <View>
      <View style={{ flexDirection: 'row', marginTop: 15, paddingLeft: 20 }}>
        <Avatar
          size='medium'
          rounded
          containerStyle={{
            borderColor: '#EEEEEE',
            borderStyle: 'solid',
            borderWidth: 1,
          }}
          source={loginState.image ? { uri: loginState.image } : require('../../images/noImage.jpeg')}
        />
        <View style={{ marginLeft: 15, alignSelf: 'center' }}>
          <Text style={styles.title}>{loginState.username}</Text>
          <Text style={styles.caption}>{loginState.email}</Text>
        </View>
      </View>
      <View style={{ paddingVertical: 50 }}>
        <Button title='ログアウト' onPress={onsignOutPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
});
