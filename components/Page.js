import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { connect } from 'react-redux';
import Clock from './Clock';
import AddCount from './AddCount';

const Page = ({
  title,
  lastUpdate,
  light,
}) =>
  (
    <div>
      <h1>{title}</h1>
      <Clock lastUpdate={lastUpdate} light={light} />
      <AddCount />
      <nav>
        <Link href="/">
          <span>Navigate</span>
        </Link>
      </nav>
    </div>
  );


Page.propTypes = {
  title: PropTypes.string.isRequired,
  lastUpdate: PropTypes.number.isRequired,
  light: PropTypes.bool.isRequired,
};

export default connect(state => state)(Page);
