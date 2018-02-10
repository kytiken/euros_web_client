import { createActions } from 'redux-actions';

export const {
  initializeCrawls,
  addCrawl,
  cleanDocuments,
  addDocument,
  addDeskErrors,
  cleanDeskErrors,
} = createActions({
  INITIALIZE_CRAWLS: crawls => ({ crawls }),
  ADD_CRAWL: crawl => ({ crawl }),
  CLEAN_DOCUMENTS: () => ({}),
  ADD_DOCUMENT: doc => ({ document: doc }),
  ADD_DESK_ERRORS: error => ({ error }),
  CLEAN_DESK_ERRORS: () => ({}),
});
