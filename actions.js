// ACTIONS
export const actionTypes = {
  ADD_DOCUMENT: 'ADD_DOCUMENT',
  CLEAN_DOCUMENTS: 'CLEAN_DOCUMENTS',
  ADD_CRAWL: 'ADD_CRAWL',
  INITIALIZE_CRAWLS: 'INITIALIZE_CRAWLS',
};

export const addDocument = doc =>
  ({ type: actionTypes.ADD_DOCUMENT, payload: doc });

export const cleanDocuments = () =>
  ({ type: actionTypes.CLEAN_DOCUMENTS });

export const addCrawl = crawl =>
  ({ type: actionTypes.ADD_CRAWL, payload: crawl });

export const initializeCrawls = crawls =>
  ({ type: actionTypes.INITIALIZE_CRAWLS, payload: crawls });
