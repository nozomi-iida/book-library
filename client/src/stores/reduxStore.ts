import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import BookReducer from '../reducers/book';
import thunk from 'redux-thunk';
import { IBook } from '../types/book';

export interface IState {
  books: IBook[],
}

const storeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      books: BookReducer,
    }),

    storeEnhancers(applyMiddleware(thunk))
  );
  return store;
};
