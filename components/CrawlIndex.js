import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CrawlForm from '../components/CrawlForm';
import Crawl from '../components/Crawl';
import CrawlError from '../models/CrawlError';

class CrawlIndex extends React.Component {
  componentDidMount() {
    this.props.initializeCrawls();
  }

  render() {
    return (
      <div>
        <CrawlForm
          createCrawl={this.props.createCrawl}
          errors={this.props.crawlFormErrors}
        />
        <ol>
          { this.props.crawls.map(crawl => <Crawl key={crawl.id} crawl={crawl} />).toJS() }
        </ol>
      </div>
    );
  }
}

CrawlIndex.propTypes = {
  crawls: ImmutablePropTypes.listOf(ImmutablePropTypes.record).isRequired,
  crawlFormErrors: ImmutablePropTypes.recordOf(CrawlError).isRequired,
  initializeCrawls: PropTypes.func.isRequired,
  createCrawl: PropTypes.func.isRequired,
};

export default CrawlIndex;
