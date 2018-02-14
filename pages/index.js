import { List } from 'immutable';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import config from '../config';
import initStore from '../store';
import CrawlIndex from '../components/CrawlIndex';
import CrawlRecord from '../models/CrawlRecord';
import CrawlError from '../models/CrawlError';
import {
  addCrawl,
  initializeCrawls,
  raiseCrawlFormErrors,
} from '../actions';

const mapStateToProps = state =>
  ({
    crawls: List(state.crawls),
    crawlFormErrors: new CrawlError(state.crawlFormErrors),
  });

const initializeCrawlsActionCreator = () => dispatch =>
  (fetch(config.crawl_url)
    .then(response => response.json())
    .then(response =>
      dispatch(initializeCrawls(response.data
        .map(crawlValues => new CrawlRecord(crawlValues)))))
  );

const createCrawl = crawl => dispatch =>
  (
    fetch(config.crawl_url, {
      method: 'POST',
      body: JSON.stringify({
        crawl: {
          url: crawl.url,
          depth_limit: crawl.depthLimit,
          timeout: crawl.timeout,
          recv_timeout: crawl.recvTimeout,
          pattern: crawl.pattern,
          cookie: crawl.cookie,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    })
      .then((response) => {
        response.json().then((json) => {
          if (response.ok) {
            dispatch(addCrawl(new CrawlRecord(json.data)));
          } else {
            const crawlError = new CrawlError({
              url: json.errors.url,
              depthLimit: json.errors.depth_limit,
              timeout: json.errors.timeout,
              recvTimeout: json.errors.recv_timeout,
              pattern: json.errors.pattern,
              cookie: json.errors.cookie,
            });
            dispatch(raiseCrawlFormErrors(crawlError));
          }
        });
      })
      .catch(error => dispatch(addCrawl(error)))
  );


const mapDispatchToProps = dispatch =>
  ({
    initializeCrawls: bindActionCreators(initializeCrawlsActionCreator, dispatch),
    createCrawl: bindActionCreators(createCrawl, dispatch),
  });

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(CrawlIndex);
