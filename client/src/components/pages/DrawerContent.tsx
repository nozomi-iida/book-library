import React, { useContext } from 'react'
import { View, Button } from 'react-native'
import { AuthContext } from '../../stores/authStore';

export default function DrawerContent (props: any) {
  const {authContext} = useContext(AuthContext);
  return (
    <View style={{paddingVertical: 50}}>
      <Button
        title='ログアウト'
        onPress={() => {authContext.signOut()}}
      />
    </View>
  )
}