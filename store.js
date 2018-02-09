import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { List } from 'immutable';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

const initialStateValue = {
  documents: List(),
  crawls: List(),
};

export default (initialState = initialStateValue) =>
  createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
