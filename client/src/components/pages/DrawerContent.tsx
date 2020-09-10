import React, { useContext } from 'react'
import { View, Button } from 'react-native'
import { AuthContext } from '../../stores/authStore';
import { DrawerActions } from '@react-navigation/native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function DrawerContent ({ navigation }: DrawerContentComponentProps) {
  const {loginState, authContext} = useContext(AuthContext);
  const onsignOutPress = () => {
    authContext.signOut()
    navigation.dispatch(DrawerActions.closeDrawer())
  }
  return (
    <>
    {loginState.username !== '' && (
      <View style={{paddingVertical: 50}}>
        <Button
          title='ログアウト'
          onPress={onsignOutPress}
        />
        </View>
      )}
    </>
  )
}