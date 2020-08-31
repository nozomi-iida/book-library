import { IBook } from '../../types/book';
import { Dispatch } from 'redux';
import axios from 'axios';

interface aciotnBook {
  username: string,
  title: string,
  description: string,
  reason: string,
  url: string,
  status: string,
  review: number,
}

export const fetchBook = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:8000/book/getApply');
    dispatch({ type: 'FETCH_BOOKS', books: data });
  } catch (error) {
    console.log(error);
  }
};

export const addBook = (book: any) => async (dispatch: Dispatch) => {
  try {
    await axios
      .post('http://localhost:8000/book/addApply', book)
      .then(res => dispatch({ type: 'FETCH_BOOKS', books: res.data }));
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = (id: string) => async (dispatch: Dispatch) => {
  try {
    await axios
      .delete('http://localhost:8000/book/deleteBook/' + id)
      .then(res => dispatch({ type: 'FETCH_BOOKS', books: res.data }));
  } catch (error) {
    console.log(error);
  }
};
