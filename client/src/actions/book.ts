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
  affiliateUrl?: string,
}

export const fetchBook = () => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:8000/book/getApply');
    // const { data } = await axios.get('http://192.168.0.22:8000/book/getApply');
    dispatch({ type: 'FETCH_BOOKS', books: data });
  } catch (error) {
    console.log(error);
  }
};

export const addBook = (book: aciotnBook) => async (dispatch: Dispatch) => {
  try {
    await axios
      // .post('http://localhost:8000/book/addApply', book)
      .post('http://192.168.0.22:8000/book/addApply', book)
      .then(res => dispatch({ type: 'FETCH_BOOKS', books: res.data }));
  } catch (error) {
    console.log(error);
  }
};

export const deleteBook = (id: string) => async (dispatch: Dispatch) => {
  try {
    await axios
    // .delete('http://localhost:8000/book/deleteBook/' + id)
    .delete('http://192.168.0.22:8000/book/deleteBook/' + id)
    .then(res => dispatch({ type: 'FETCH_BOOKS', books: res.data }));
  } catch (error) {
    console.log(error);
  }
};

export const updateBook = (id: string, book: aciotnBook) => async (dispatch: Dispatch) => {
  try {
    await axios
    // .post('http://localhost:8000/book/updateBook/' + id, book)
    .post('http://192.168.0.22:8000/book/updateBook/' + id, book)
    .then(res => dispatch({ type: 'FETCH_BOOKS', books: res.data }));
  } catch (error) {
    console.log(error);
  }
}