import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CrawlRecord from '../models/CrawlRecord';
import CrawlError from '../models/CrawlError';

class CrawlForm extends React.Component {
  constructor(props) {
    super(props);
    this.urlInput = null;
    this.depthLimitInput = null;
    this.timeoutInput = null;
    this.recvTimeoutInput = null;
    this.patternInput = null;
    this.cookieInput = null;
  }

  handleSubmit() {
    const crawl = new CrawlRecord({
      url: this.urlInput.value,
      depthLimit: this.depthLimitInput.value,
      timeout: this.timeoutInput.value,
      recvTimeout: this.recvTimeoutInput.value,
      pattern: this.patternInput.value,
      cookie: this.cookieInput.value,
    });
    this.props.createCrawl(crawl);
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <label htmlFor="urlInput">
              url:
              <input ref={(input) => { this.urlInput = input; }} id="urlInput" type="text" />
            </label>
            <span>{this.props.errors.url}</span>
          </div>
          <div>
            <label htmlFor="depthLimitInput">
              depth_limit:
              <input ref={(input) => { this.depthLimitInput = input; }} id="depthLimitInput" type="text" />
            </label>
            <span>{this.props.errors.depthLimit}</span>
          </div>
          <div>
            <label htmlFor="timeoutInput">
              timeout:
              <input ref={(input) => { this.timeoutInput = input; }} id="timeoutInput" type="text" />
            </label>
            <span>{this.props.errors.timeout}</span>
          </div>
          <div>
            <label htmlFor="recvTimeoutInput">
              recv_timeout:
              <input ref={(input) => { this.recvTimeoutInput = input; }} id="recvTimeoutInput" type="text" />
            </label>
            <span>{this.props.errors.recvTimeout}</span>
          </div>
          <div>
            <label htmlFor="patternInput">
              pattern:
              <input ref={(input) => { this.patternInput = input; }} id="patternInput" type="text" />
            </label>
            <span>{this.props.errors.pattern}</span>
          </div>
          <div>
            <label htmlFor="cookieInput">
              cookie:
              <input ref={(input) => { this.cookieInput = input; }} id="cookieInput" type="text" />
            </label>
            <span>{this.props.errors.cookie}</span>
          </div>
          <button onClick={() => this.handleSubmit()}>
            submit
          </button>
        </div>
      </div>
    );
  }
}

CrawlForm.propTypes = {
  createCrawl: PropTypes.func.isRequired,
  errors: ImmutablePropTypes.recordOf(CrawlError).isRequired,
};

export default CrawlForm;
