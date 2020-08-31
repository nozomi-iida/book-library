import { IBook } from '../types/book';

interface IFetchBooks {
  type: 'FETCH_BOOKS';
  books: IBook[];
};

type IAciton = IFetchBooks;

const initialState: IBook[] = [];


export default (state = initialState, action: IAciton) => {
  switch (action.type) {
    case 'FETCH_BOOKS':
      return [...action.books] 
    default:
      return state;
  }
};
