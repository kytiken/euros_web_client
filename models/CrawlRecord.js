import { Record } from 'immutable';

const crawlAttr = {
  id: null,
  url: '',
  depthLimit: null,
  timeout: null,
  recvTimeout: null,
  pattern: '',
  cookie: '',
};

export default class CrawlRecord extends Record(crawlAttr) {
}
