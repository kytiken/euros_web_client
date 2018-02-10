import { createActions } from 'redux-actions';

export const {
  initializeCrawls,
  addCrawl,
  cleanDocuments,
  addDocument,
} = createActions({
  INITIALIZE_CRAWLS: crawls => ({ crawls }),
  ADD_CRAWL: crawl => ({ crawl }),
  CLEAN_DOCUMENTS: () => ({}),
  ADD_DOCUMENT: doc => ({ document: doc }),
});
