import { createActions } from 'redux-actions';

export const {
  initializeCrawls,
  addCrawl,
  cleanDocuments,
  addDocument,
  addDeskErrors,
  cleanDeskErrors,
  raiseCrawlFormErrors,
} = createActions({
  INITIALIZE_CRAWLS: crawls => ({ crawls }),
  ADD_CRAWL: crawl => ({ crawl }),
  RAISE_CRAWL_FORM_ERRORS: crawlFormErrors => ({ crawlFormErrors }),
  CLEAN_DOCUMENTS: () => ({}),
  ADD_DOCUMENT: doc => ({ document: doc }),
  ADD_DESK_ERRORS: error => ({ error }),
  CLEAN_DESK_ERRORS: () => ({}),
});
