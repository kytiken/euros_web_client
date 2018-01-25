// ACTIONS
export const actionTypes = {
  ADD: 'ADD',
  TICK: 'TICK',
  START_CRAWL: 'START_CRAWL',
  ADD_DOCUMENT: 'ADD_DOCUMENT',
  CLEAN_DOCUMENTS: 'CLEAN_DOCUMENTS',
};

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
