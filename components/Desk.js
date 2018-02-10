import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Document from './Document';
import DocumentRecord from '../models/DocumentRecord';
import DeskErrorsMessageBox from './DeskErrorsMessageBox';

class Desk extends React.Component {
  componentDidMount() {
    /* eslint-disable */
    this.props.channel.on('select', data => {
    /* eslint-disable */
      this.props.addDocument(new DocumentRecord(data))
    });
  }

  handleSelect() {
    this.props.cleanDocuments();
    /* eslint-disable */
    this.props.channel
      .push("select", { crawl_id: this.props.url.query.crawlId, query: this.refs.queryInput.value }, 60000)
      .receive('ok', (msg) => console.log('created message', msg) )
    /* eslint-disable */
      .receive('error', (reasons) => this.props.addErrors('create failed', reasons))
      .receive('timeout', () => this.props.addErrors('Networking issue...'))
  }

  handleAddError() {
    this.props.addErrors((new Error('raised error')).message);
  }

  deskErrorsMessageBox() {
    if(this.props.errors.size > 0) {
      return <DeskErrorsMessageBox messages={ this.props.errors } cleanErrors={ this.props.cleanErrors } />;
    } 
    return <div />;
  }

  render() {
    return (
      <div>
        <input ref="queryInput" type="text" />
        <button onClick={this.handleSelect.bind(this)}>select</button>
        <button onClick={this.props.cleanDocuments}>clean</button>
        <button onClick={this.handleAddError.bind(this)}>raise error</button>
        <Link href="/">
          <span>GoToTop</span>
        </Link>
        { this.deskErrorsMessageBox() }
        <ol>
          { this.props.documents.map(doc => <Document key={doc.id} doc={doc} />) }
        </ol>
      </div>
    );
  }
}

Desk.propTypes = {
  addDocument: PropTypes.func.isRequired,
  documents: ImmutablePropTypes.listOf(ImmutablePropTypes.record).isRequired,
  errors: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
  cleanDocuments: PropTypes.func.isRequired,
  cleanErrors: PropTypes.func.isRequired,
};

export default Desk;
