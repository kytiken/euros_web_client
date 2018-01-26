import { actionTypes } from './actions';

export const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
  documents: [],
  crawls: [],
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
    case actionTypes.ADD_CRAWL:
      return Object.assign({}, state, {
        crawls: state.crawls.concat(action.crawl),
      });
    default: return state;
  }
};
