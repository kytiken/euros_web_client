import React from 'react';
import PropTypes from 'prop-types';
import { addCount, serverRenderClock } from '../store';
import Crawl from '../components/Crawl';

class Desk extends React.Component {
  static getInitialProps({ store, isServer }) {
    store.dispatch(serverRenderClock(isServer));
    store.dispatch(addCount());

    return { isServer };
  }

  componentDidMount() {
    this.timer = this.props.startClock();

    this.props.channel.on('crawl', msg => {
      this.props.addDocument(msg.url)
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <button onClick={() => {
          this.props.cleanDocuments();
          this.props.channel.push("crawl", { url: 'http://aniram-czech.hatenablog.com/' }, 60000)
            .receive('ok', (msg) => console.log('created message', msg) )
            .receive('error', (reasons) => console.log('create failed', reasons) )
            .receive('timeout', () => console.log('Networking issue...') )
        }}>crawl</button>
        <button onClick={this.props.cleanDocuments}>clean</button>
        <Crawl url="http://google.com" documents={this.props.documents} linkTo="/" />
      </div>
    );
  }
}

Desk.propTypes = {
  startClock: PropTypes.func.isRequired,
  addDocument: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Desk;
