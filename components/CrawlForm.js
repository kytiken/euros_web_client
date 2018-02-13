import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import config from '../config';
import CrawlRecord from '../models/CrawlRecord';
import CrawlError from '../models/CrawlError';
import CrawlFormError from './CrawlFormError';

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
          <button onClick={() => {
            const crawl = new CrawlRecord({
              url: this.urlInput.value,
              depthLimit: this.depthLimitInput.value,
              timeout: this.timeoutInput.value,
              recvTimeout: this.recvTimeoutInput.value,
              pattern: this.patternInput.value,
              cookie: this.cookieInput.value,
            });
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
                  this.props.addCrawl(new CrawlRecord(json.data));
                } else {
                  const crawlError = new CrawlError({
                    url: json.errors.url,
                    depthLimit: json.errors.depth_limit,
                    timeout: json.errors.timeout,
                    recvTimeout: json.errors.recv_timeout,
                    pattern: json.errors.pattern,
                    cookie: json.errors.cookie,
                  });
                  this.props.raiseCrawlFormErrors(crawlError);
                }
              });
            })
            .catch(error => this.props.addCrawl(error));
          }}
          >
          submit
          </button>
        </div>
      </div>
    );
  }
}

CrawlForm.propTypes = {
  addCrawl: PropTypes.func.isRequired,
  raiseCrawlFormErrors: PropTypes.func.isRequired,
  errors: ImmutablePropTypes.recordOf(CrawlError).isRequired,
};

export default CrawlForm;
