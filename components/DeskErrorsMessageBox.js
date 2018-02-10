import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const DeskErrorsMessageBox = ({ messages, cleanErrors }) =>
  (
    <div>
      <h3>errors</h3>
      <button onClick={cleanErrors}>clean errors</button>
      <ul>
        { messages.map(msg => <li key={msg}>{msg}</li>) }
      </ul>
    </div>
  );

DeskErrorsMessageBox.propTypes = {
  messages: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
  cleanErrors: PropTypes.func.isRequired,
};


export default DeskErrorsMessageBox;
