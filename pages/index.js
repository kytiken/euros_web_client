import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import initStore from '../store';
import { addCrawl } from '../actions';
import Crawl from '../components/Crawl';

class Counter extends React.Component {
  static getInitialProps({ isServer }) {
    return { isServer };
  }

  render() {
    return (
      <div>
        <input ref="urlInput" type="text" />
        <button onClick={() => {
          const crawl = {
            url: 'http://google.com',
            timeout: '60000',
            recv_timeout: '60000',
          };
          this.props.addCrawl(crawl);
        }}>addCrawl</button>
        <button onClick={() => {
          fetch('http://localhost:32771/crawls')
          .then(response => response.json())
          .then(response => response.data.forEach(crawl => this.props.addCrawl(crawl)));
        }}>get index</button>
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
  addCrawl: PropTypes.func.isRequired,
  crawls: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state =>
  ({ crawls: state.crawls });

const mapDispatchToProps = dispatch =>
  ({
    addCrawl: bindActionCreators(addCrawl, dispatch),
  });

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Counter);
