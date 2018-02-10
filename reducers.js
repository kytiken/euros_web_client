import { List } from 'immutable';
import { handleActions } from 'redux-actions';
import {
  initializeCrawls,
  addCrawl,
  cleanDocuments,
  addDocument,
  addDeskErrors,
  cleanDeskErrors,
} from './actions';

export const defaultState = {
  documents: List(),
  crawls: List(),
  deskErrors: List(),
};

export const reducer = handleActions({
  [initializeCrawls](state, { payload: { crawls } }) {
    return { ...state, crawls: List(crawls) };
  },
  [addCrawl](state, { payload: { crawl } }) {
    return { ...state, crawls: List(state.crawls).push(crawl) };
  },
  [cleanDocuments](state) {
    return { ...state, documents: List() };
  },
  [addDocument](state, { payload }) {
    return { ...state, documents: List(state.documents).push(payload.document) };
  },
  [addDeskErrors](state, { payload: { error } }) {
    return { ...state, deskErrors: List(state.desk_errors).push(error) };
  },
  [cleanDeskErrors](state) {
    return { ...state, deskErrors: List() };
  },
}, defaultState);
