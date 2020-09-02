import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  TouchableHighlight,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { IBook } from '../../types/book';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBook, updateBook } from '../../actions/book';
import { fetchUser } from '../../actions/user';
import { IState } from '../../stores/reduxStore';

type FormData = {
  title: string;
  url: string;
  description: string;
  reason: string;
};

type RootStackParamList = {
  Apply: undefined;
  detail: { book: IBook };
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'detail'>;

type NavigationProp = StackNavigationProp<RootStackParamList, 'Apply'>;

type Props = {
  navigation: NavigationProp;
  route: ProfileScreenRouteProp;
};

export default function EditForm({ navigation, route }: Props) {
  const { control, setValue, handleSubmit, errors } = useForm<FormData>();
  const [book, setBook] = useState<IBook>(route.params.book);
  const user = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    dispatch(fetchUser(token));
  };

  useEffect(() => {
    Boiler();
  }, []);

  const onSubmit = ({ title, description, reason, url }: FormData) => {
    const newBook = {
      username: user.username,
      title,
      description,
      reason,
      url,
      status: '申請中',
      review: 1,
    };
    dispatch(updateBook(book._id, newBook))
    navigation.navigate('Apply');
    setValue('title', '');
    setValue('url', '');
    setValue('description', '');
    setValue('reason', '');
  };

  const deletePress = (id: string) => {
    dispatch(deleteBook(id));
    navigation.navigate('Apply');
  };

  return (
    <View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>本当に削除しますか？</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3', marginRight: 10 }}
                onPress={() => {
                  deletePress(book._id);
                }}
              >
                <Text style={styles.textStyle}>はい</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>いいえ</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
      {book && (
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
            defaultValue={book.title}
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
            defaultValue={book.url}
          />
          <View style={styles.errContainer}>
            {errors.url && (
              <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
            )}
          </View>

          <Text>本の簡単なdetail*</Text>
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
            defaultValue={book.description}
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
            defaultValue={book.reason}
          />
          <View style={styles.errContainer}>
            {errors.reason && (
              <Text style={{ color: '#FF0000' }}>書き忘れています。</Text>
            )}
          </View>
          <View style={{ marginBottom: 10 }}>
            <Button title='更新する' onPress={handleSubmit(onSubmit)} />
          </View>
          <Button title='削除する' onPress={() => setModalVisible(true)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
