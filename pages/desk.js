import { bindActionCreators } from 'redux';
import { Socket } from 'phoenix';
import dynamic from 'next/dynamic';
import withRedux from 'next-redux-wrapper';
import { List } from 'immutable';
import config from '../config';
import initStore from '../store';
import {
  addDocument,
  cleanDocuments,
  addDeskErrors,
  cleanDeskErrors,
} from '../actions';

const mapStateToProps = state =>
  ({
    documents: List(state.documents),
    errors: List(state.deskErrors),
  });

const mapDispatchToProps = (dispatch) => {
  let channel = {};
  if (typeof window !== 'undefined') {
    const socket = new Socket(config.socket_url, { params: { userToken: '123' } });
    socket.connect();
    channel = socket.channel('desk:lobby', { token: 'hoge' });
    channel.join();
  }

  return ({
    addDocument: bindActionCreators(addDocument, dispatch),
    cleanDocuments: bindActionCreators(cleanDocuments, dispatch),
    addErrors: bindActionCreators(addDeskErrors, dispatch),
    cleanErrors: bindActionCreators(cleanDeskErrors, dispatch),
    channel,
  });
};

export default withRedux(
  initStore,
  mapStateToProps,
  mapDispatchToProps,
)(dynamic(import('../components/Desk'), { ssr: false }));
