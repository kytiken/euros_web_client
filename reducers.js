import { List } from 'immutable';
import { actionTypes } from './actions';

// REDUCERS
export default (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_DOCUMENT:
      return Object.assign({}, state, {
        documents: state.documents.push(action.payload),
      });
    case actionTypes.CLEAN_DOCUMENTS:
      return Object.assign({}, state, {
        documents: List(),
      });
    case actionTypes.ADD_CRAWL:
      return Object.assign({}, state, {
        crawls: state.crawls.push(action.payload),
      });
    case actionTypes.INITIALIZE_CRAWLS:
      return Object.assign({}, state, {
        crawls: state.crawls.concat(action.payload),
      });
    default: return state;
  }
};
