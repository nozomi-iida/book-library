import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IBook } from '../../types/book';

type RootsStackParamList = {
  applyForm: undefined;
  detail: { book: IBook } | undefined;
};

type ScreenNavigationProps = StackNavigationProp<
  RootsStackParamList,
  'applyForm' | 'detail'
>

type Props = {
  navigation: ScreenNavigationProps
}

export default ({navigation}: Props) => {
  return (
    <>
      <Icon
        raised
        color='#f50'
        name='plus'
        type='font-awesome'
        onPress={() => navigation.navigate('applyForm')}
        containerStyle={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  icon: {
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 0,
    shadowOpacity: 1,
  }
});
