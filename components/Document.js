import React from 'react';
import PropTypes from 'prop-types';

const Document = ({
  url,
}) =>
  (<li>{url}</li>);


Document.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Document;
