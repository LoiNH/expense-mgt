import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
  return (
    <div className="expense-footer mt-5 mb-3">
      <div className="text-13 text-center">
        © {props.year} - Expense Money. Version: {props.version}
      </div>
    </div>
  );
};

Footer.propTypes = {
  version: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

export default Footer;
