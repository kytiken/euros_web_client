import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { reducer, defaultState } from './reducers';

export default (state = defaultState) =>
  createStore(reducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)));
