import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Document = ({
  doc,
}) =>
  (<li>{doc.body}</li>);


Document.propTypes = {
  doc: ImmutablePropTypes.recordOf({ body: PropTypes.string }).isRequired,
};

export default Document;
