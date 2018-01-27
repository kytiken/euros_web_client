import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import initStore from '../store';
import Crawl from '../components/Crawl';
import CrawlForm from '../components/CrawlForm';
import { addCrawl } from '../actions';
import config from '../config';

class Counter extends React.Component {
  static getInitialProps({ isServer }) {
    return { isServer };
  }

  componentDidMount() {
    fetch(config.crawl_url)
      .then(response => response.json())
      .then(response => response.data.forEach(crawl => this.props.addCrawl(crawl)));
  }

  render() {
    return (
      <div>
        <CrawlForm addCrawl={this.props.addCrawl} />
        <ol>
          { this.props.crawls.map(crawl => <Crawl key={crawl.id} crawl={crawl} />) }
        </ol>
        <Link href="/desk">
          <span>GoToDesk</span>
        </Link>
      </div>
    );
  }
}

Counter.propTypes = {
  crawls: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state =>
  ({ crawls: state.crawls });

const mapDispatchToProps = dispatch =>
  ({
    addCrawl: bindActionCreators(addCrawl, dispatch),
  });

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Counter);
