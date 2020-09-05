import React from 'react';
import PropTypes from 'prop-types';

const HomeListJars = (props) => {
  return (
    <div className="expense-main-block shadow rounded bg-white p-3 mt-2">
      <span className="mb-0 text-12 weight-600 text-uppercase">Danh sách hũ</span>
      <div className="expense-main-block px-1 mt-2">{props.children}</div>
    </div>
  );
};

HomeListJars.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default HomeListJars;
