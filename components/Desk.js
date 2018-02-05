import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Document from './Document';
import config from '../config';
import DocumentRecord from '../models/DocumentRecord';

class Desk extends React.Component {
  componentDidMount() {
    /* eslint-disable */
    this.props.channel.on('select', msg => {
    /* eslint-disable */
      this.props.addDocument(msg)
    });
    console.log(this.props.url.query.crawlId);
    fetch(config.crawl_url + '/' + this.props.url.query.crawlId.toString() + '/documents')
      .then(response => response.json())
      .then(response => response.data.forEach(doc =>
        this.props.addDocument(new DocumentRecord(doc))
      ));
  }

  render() {
    return (
      <div>
        <input ref="queryInput" type="text" />
        <button onClick={() => {
          this.props.cleanDocuments();
          /* eslint-disable */
          this.props.channel
            .push("select", { crawl_id: this.props.url.query.crawlId, query: this.refs.queryInput.value }, 60000)
            .receive('ok', (msg) => console.log('created message', msg) )
            .receive('error', (reasons) => console.log('create failed', reasons) )
            .receive('timeout', () => console.log('Networking issue...') )
          /* eslint-disable */
        }}>select</button>
        <button onClick={this.props.cleanDocuments}>clean</button>
        <Link href="/">
          <span>GoToTop</span>
        </Link>
        <ol>
          { this.props.documents.map(doc => <Document key={doc.id} doc={doc} />) }
        </ol>
      </div>
    );
  }
}

Desk.propTypes = {
  addDocument: PropTypes.func.isRequired,
  documents: PropTypes.arrayOf(ImmutablePropTypes.record).isRequired,
  cleanDocuments: PropTypes.func.isRequired,
};

export default Desk;
