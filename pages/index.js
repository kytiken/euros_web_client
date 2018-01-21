import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import { initStore, startClock, addCount, serverRenderClock } from '../store';
import Page from '../components/Page';

class Counter extends React.Component {
  static getInitialProps({ store, isServer }) {
    store.dispatch(serverRenderClock(isServer));
    store.dispatch(addCount());

    return { isServer };
  }

  componentDidMount() {
    this.timer = this.props.startClock();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <Page title="Index Page" linkTo="/other" />
    );
  }
}

Counter.propTypes = {
  startClock: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  ({
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch),
  });

export default withRedux(initStore, null, mapDispatchToProps)(Counter);
