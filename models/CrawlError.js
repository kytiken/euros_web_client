import { Record } from 'immutable';

const crawlErrorAttr = {
  url: null,
  depthLimit: null,
  timeout: null,
  recvTimeout: null,
  pattern: null,
  cookie: null,
};

export default class CrawlError extends Record(crawlErrorAttr) {
  isRaised() {
    return this.url ||
      this.depthLimit ||
      this.timeout ||
      this.recvTimeout ||
      this.pattern ||
      this.cookie;
  }
}
