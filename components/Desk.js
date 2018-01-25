import React from 'react';
import PropTypes from 'prop-types';
import { addCount, serverRenderClock } from '../actions';
import Crawl from '../components/Crawl';

class Desk extends React.Component {
  static getInitialProps({ store, isServer }) {
    store.dispatch(serverRenderClock(isServer));
    store.dispatch(addCount());

    return { isServer };
  }

  componentDidMount() {
    this.timer = this.props.startClock();

    /* eslint-disable */
    this.props.channel.on('crawl', msg => {
    /* eslint-disable */
      this.props.addDocument(msg.url)
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <input ref="urlInput" type="text" />
        <button onClick={() => {
          this.props.cleanDocuments();
          /* eslint-disable */
          this.props.channel.push("crawl", { url: this.refs.urlInput.value }, 60000)
            .receive('ok', (msg) => console.log('created message', msg) )
            .receive('error', (reasons) => console.log('create failed', reasons) )
            .receive('timeout', () => console.log('Networking issue...') )
          /* eslint-disable */
        }}>crawl</button>
        <button onClick={this.props.cleanDocuments}>clean</button>
      <button onClick={() => {
        fetch('http://localhost:32771')
        .then(response => response)
      }}>sample</button>
        <Crawl url="http://google.com" documents={this.props.documents} linkTo="/" />
      </div>
    );
  }
}

Desk.propTypes = {
  startClock: PropTypes.func.isRequired,
  addDocument: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.string).isRequired,
  cleanDocuments: PropTypes.func.isRequired,
};

export default Desk;
