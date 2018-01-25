import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCount } from '../actions';

const AddCount = props =>
  (
    <div>
      <style jsx>{`
        div {
          padding: 0 0 20px 0;
        }
    `}</style>
      <h1>AddCount: <span>{props.count}</span></h1>
      <button onClick={props.addCount}>Add To Count</button>
    </div>
  );

AddCount.propTypes = {
  count: PropTypes.number.isRequired,
  addCount: PropTypes.func.isRequired,
};

const mapStateToProps = ({ count }) => ({ count });

const mapDispatchToProps = dispatch =>
  ({ addCount: bindActionCreators(addCount, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(AddCount);
