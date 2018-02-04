import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import initStore from '../store';
import Crawl from '../components/Crawl';
import CrawlForm from '../components/CrawlForm';
import { addCrawl, initializeCrawls } from '../actions';
import config from '../config';

class Counter extends React.Component {
  static getInitialProps({ isServer }) {
    return { isServer };
  }

  componentDidMount() {
    this.props.initializeCrawls();
  }

  render() {
    return (
      <div>
        <CrawlForm addCrawl={this.props.addCrawl} />
        <ol>
          { this.props.crawls.map(crawl => <Crawl key={crawl.id} crawl={crawl} />) }
        </ol>
      </div>
    );
  }
}

Counter.propTypes = {
  crawls: PropTypes.arrayOf(PropTypes.object).isRequired,
  initializeCrawls: PropTypes.func.isRequired,
  addCrawl: PropTypes.func.isRequired,
};

const mapStateToProps = state =>
  ({ crawls: state.crawls });

const initializeCrawlsActionCreator = () => dispatch =>
  (fetch(config.crawl_url)
    .then(response => response.json())
    .then(response => dispatch(initializeCrawls(response.data))));

const mapDispatchToProps = dispatch =>
  ({
    addCrawl: bindActionCreators(addCrawl, dispatch),
    initializeCrawls: bindActionCreators(initializeCrawlsActionCreator, dispatch),
  });

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Counter);
