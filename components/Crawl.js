import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';

const Crawl = ({
  crawl,
}) =>
  (
    <li>
      <Link href={{ pathname: '/desk', query: { crawlId: crawl.id } }}>
        { crawl.url }
      </Link>
    </li>
  );


Crawl.propTypes = {
  // crawl: PropTypes.object.isRequired,
};

export default connect(state => state)(Crawl);
