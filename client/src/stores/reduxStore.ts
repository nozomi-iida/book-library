import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import BookReducer from '../reducers/book';
import UserReducer from '../reducers/user';
import thunk from 'redux-thunk';
import { IBook } from '../types/book';
import { IUser } from '../types/user';

export interface IState {
  books: IBook[],
  user: IUser
}

const storeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      books: BookReducer,
      user: UserReducer,
    }),

    storeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
