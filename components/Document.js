import React from 'react';
import PropTypes from 'prop-types';

const Document = ({
  doc
}) =>
  (<li>{doc.body}</li>);


Document.propTypes = {
  doc: PropTypes.object.isRequired,
};

export default Document;
