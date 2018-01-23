import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import Document from './Document';

const Crawl = ({
  title,
  documents,
  url,
  linkTo,
}) =>
  (
    <div>
      <h1>{title}</h1>
      <h2>{url}</h2>
      <nav>
        <Link href={linkTo}>
          <span>Navigate</span>
        </Link>
      </nav>
      <ol>
        { documents.map(doc => <Document url={doc.url} />) }
      </ol>
    </div>
  );


Crawl.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  documents: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(state => state)(Crawl);
