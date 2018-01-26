import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Crawl = ({
  crawl,
}) =>
  (
    <li>
      { crawl.url }
    </li>
  );


Crawl.propTypes = {
  // crawl: PropTypes.object.isRequired,
};

export default connect(state => state)(Crawl);
