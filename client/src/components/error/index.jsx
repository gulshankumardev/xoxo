import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ msg }) => (
  <div className="alert alert-danger" role="alert">
    {msg}
  </div>
);

Error.defaultProps = {
  msg: 'Something is wrong',
};

Error.propTypes = {
  msg: PropTypes.string,
};

export default Error;
