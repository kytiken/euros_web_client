import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import config from '../config';
import initStore from '../store';
import Crawl from '../components/Crawl';
import CrawlForm from '../components/CrawlForm';
import CrawlRecord from '../models/CrawlRecord';
import CrawlError from '../models/CrawlError';
import {
  addCrawl,
  initializeCrawls,
  raiseCrawlFormErrors,
} from '../actions';

class Crawls extends React.Component {
  componentDidMount() {
    this.props.initializeCrawls();
  }

  render() {
    return (
      <div>
        <CrawlForm
          addCrawl={this.props.addCrawl}
          raiseCrawlFormErrors={this.props.raiseCrawlFormErrors}
          errors={this.props.crawlFormErrors}
        />
        <ol>
          { this.props.crawls.map(crawl => <Crawl key={crawl.id} crawl={crawl} />).toJS() }
        </ol>
      </div>
    );
  }
}

Crawls.propTypes = {
  crawls: ImmutablePropTypes.listOf(ImmutablePropTypes.record).isRequired,
  crawlFormErrors: ImmutablePropTypes.recordOf(CrawlError).isRequired,
  initializeCrawls: PropTypes.func.isRequired,
  addCrawl: PropTypes.func.isRequired,
  raiseCrawlFormErrors: PropTypes.func.isRequired,
};

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

const mapDispatchToProps = dispatch =>
  ({
    addCrawl: bindActionCreators(addCrawl, dispatch),
    raiseCrawlFormErrors: bindActionCreators(raiseCrawlFormErrors, dispatch),
    initializeCrawls: bindActionCreators(initializeCrawlsActionCreator, dispatch),
  });

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Crawls);
