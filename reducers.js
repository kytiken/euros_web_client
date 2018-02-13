import { List } from 'immutable';
import { handleActions } from 'redux-actions';
import {
  initializeCrawls,
  addCrawl,
  raiseCrawlFormErrors,
  cleanDocuments,
  addDocument,
  addDeskErrors,
  cleanDeskErrors,
} from './actions';
import CrawlError from './models/CrawlError';

export const defaultState = {
  documents: List(),
  crawls: List(),
  deskErrors: List(),
  crawlFormErrors: new CrawlError(),
};

export const reducer = handleActions({
  [initializeCrawls](state, { payload: { crawls } }) {
    return { ...state, crawls: List(crawls) };
  },
  [addCrawl]: {
    next(state, { payload: { crawl } }) {
      return { ...state, crawls: List(state.crawls).push(crawl) };
    },
    throw(state, action) {
      return { ...state, globalErrorMessage: action.payload.message };
    },
  },
  [raiseCrawlFormErrors](state, { payload: { crawlFormErrors } }) {
    return { ...state, crawlFormErrors };
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
