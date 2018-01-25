import { bindActionCreators } from 'redux';
import { Socket } from 'phoenix';
import dynamic from 'next/dynamic';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store';
import { startClock, addCount, addDocument, cleanDocuments } from '../actions';

const mapStateToProps = state =>
  ({ documents: state.documents });

const mapDispatchToProps = (dispatch) => {
  let channel = {};
  if (typeof window !== 'undefined') {
    const socket = new Socket('ws://localhost:32769/socket', { params: { userToken: '123' } });
    socket.connect();
    channel = socket.channel('desk:lobby', { token: 'hoge' });
    channel.join();
  }

  return ({
    addCount: bindActionCreators(addCount, dispatch),
    addDocument: bindActionCreators(addDocument, dispatch),
    cleanDocuments: bindActionCreators(cleanDocuments, dispatch),
    startClock: bindActionCreators(startClock, dispatch),
    channel,
  });
};

export default withRedux(
  initStore,
  mapStateToProps,
  mapDispatchToProps,
)(dynamic(import('../components/Desk'), { ssr: false }));
