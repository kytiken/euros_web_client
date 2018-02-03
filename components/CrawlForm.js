import React from 'react';
import PropTypes from 'prop-types';
import config from '../config';

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
          <label htmlFor="urlInput">
            url:
            <input ref={(input) => { this.urlInput = input; }} id="urlInput" type="text" />
          </label>
        </div>
        <div>
          <label htmlFor="depthLimitInput">
            depth_limit:
            <input ref={(input) => { this.depthLimitInput = input; }} id="depthLimitInput" type="text" />
          </label>
        </div>
        <div>
          <label htmlFor="timeoutInput">
            timeout:
            <input ref={(input) => { this.timeoutInput = input; }} id="timeoutInput" type="text" />
          </label>
        </div>
        <div>
          <label htmlFor="recvTimeoutInput">
            recv_timeout:
            <input ref={(input) => { this.recvTimeoutInput = input; }} id="recvTimeoutInput" type="text" />
          </label>
        </div>
        <div>
          <label htmlFor="patternInput">
            pattern:
            <input ref={(input) => { this.patternInput = input; }} id="patternInput" type="text"  />
          </label>
        </div>
        <div>
          <label htmlFor="cookieInput">
            cookie:
            <input ref={(input) => { this.cookieInput = input; }} id="cookieInput" type="text" />
          </label>
        </div>
        <button onClick={() => {
          const crawl = {
            url: this.urlInput.value,
            depth_limit: this.depthLimitInput.value,
            timeout: this.timeoutInput.value,
            recv_timeout: this.recvTimeoutInput.value,
            pattern: this.patternInput.value,
            cookie: this.cookieInput.value,
          };
          fetch(config.crawl_url, {
            method: 'POST',
            body: JSON.stringify({ crawl }),
            headers: new Headers({
              'Content-Type': 'application/json',
              Accept: 'application/json',
            }),
          })
          .then(res => res.json())
          .then(response => this.props.addCrawl(response.data))
          .catch(error => console.error('Error:', error));
        }}>
        submit
        </button>
      </div>
    );
  }
}

CrawlForm.propTypes = {
  addCrawl: PropTypes.func.isRequired,
};

export default CrawlForm;
