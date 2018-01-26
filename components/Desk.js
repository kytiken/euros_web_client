import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Document from './Document';

class Desk extends React.Component {
  static getInitialProps({ isServer }) {
    return { isServer };
  }

  componentDidMount() {
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
          this.props.channel
            .push("crawl", { url: this.refs.urlInput.value }, 60000)
            .receive('ok', (msg) => console.log('created message', msg) )
            .receive('error', (reasons) => console.log('create failed', reasons) )
            .receive('timeout', () => console.log('Networking issue...') )
          /* eslint-disable */
        }}>crawl</button>
        <button onClick={this.props.cleanDocuments}>clean</button>

        <ol>
          { this.props.documents.map(doc => <Document url={doc.url} />) }
        </ol>
        <Link href="/">
          <span>GoToTop</span>
        </Link>
      </div>
    );
  }
}

Desk.propTypes = {
  addDocument: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(PropTypes.string).isRequired,
  cleanDocuments: PropTypes.func.isRequired,
};

export default Desk;
