import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
  documents: [{ url: 'http://google.com' }],
};

export const actionTypes = {
  ADD: 'ADD',
  TICK: 'TICK',
  START_CRAWL: 'START_CRAWL',
  ADD_DOCUMENT: 'ADD_DOCUMENT',
	CLEAN_DOCUMENTS: 'CLEAN_DOCUMENTS',
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return Object.assign({}, state, { lastUpdate: action.ts, light: !!action.light });
    case actionTypes.ADD:
      return Object.assign({}, state, {
        count: state.count + 1,
      });
    case actionTypes.START_CRAWL:
      return Object.assign({}, state, {
        url: state.url,
      });
    case actionTypes.ADD_DOCUMENT:
      return Object.assign({}, state, {
        documents: state.documents.concat({ url: action.url }),
      });
    case actionTypes.CLEAN_DOCUMENTS:
      return Object.assign({}, state, {
        documents: [],
      });
    default: return state;
  }
};

// ACTIONS
export const serverRenderClock = isServer => dispatch =>
  dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() });

export const startClock = () => dispatch =>
  setInterval(() => dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() }), 800);

export const addCount = () => dispatch =>
  dispatch({ type: actionTypes.ADD });

export const startCrawl = () => dispatch =>
  dispatch({ type: actionTypes.START_CRAWL, url: 'https://euros-test.blogspot.jp' });

export const addDocument = url => dispatch =>
  dispatch({ type: actionTypes.ADD_DOCUMENT, url });

export const cleanDocuments = () => dispatch =>
  dispatch({ type: actionTypes.CLEAN_DOCUMENTS });

export const initStore = (initialState = exampleInitialState) =>
  createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

