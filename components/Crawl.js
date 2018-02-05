import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Link from 'next/link';
import { connect } from 'react-redux';

const Crawl = ({
  crawl,
}) =>
  (
    <li>
      <Link href={{ pathname: '/desk', query: { crawlId: crawl.id } }}>
        <a>{ crawl.url }</a>
      </Link>
    </li>
  );


Crawl.propTypes = {
  crawl: ImmutablePropTypes.recordOf({ url: PropTypes.string }).isRequired,
};

export default connect(state => state)(Crawl);
