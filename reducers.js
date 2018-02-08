import { actionTypes } from './actions';

export const exampleInitialState = {
  documents: [],
  crawls: [],
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_DOCUMENT:
      return Object.assign({}, state, {
        documents: state.documents.concat(action.payload),
      });
    case actionTypes.CLEAN_DOCUMENTS:
      return Object.assign({}, state, {
        documents: [],
      });
    case actionTypes.ADD_CRAWL:
      return Object.assign({}, state, {
        crawls: state.crawls.unshift(action.crawl),
      });
    case actionTypes.INITIALIZE_CRAWLS:
      return Object.assign({}, state, {
        crawls: action.payload,
      });
    default: return state;
  }
};
