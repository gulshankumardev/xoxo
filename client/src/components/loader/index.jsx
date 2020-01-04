import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ small, right }) => (
  <div
    className={`spinner-border ${small && 'spinner-border-sm h6'}
    ${right && 'float-right'}`}
    role="status"
  >
    <span className="sr-only">Loading...</span>
  </div>
);

Loader.defaultProps = {
  small: false,
  right: false,
};

Loader.propTypes = {
  small: PropTypes.bool,
  right: PropTypes.bool,
};

export default Loader;
