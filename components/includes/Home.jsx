import React from 'react';
import PropTypes from 'prop-types';

const Home = (props) => {
  return (
    <div className="row">
      <div className="col-md-12 col-lg-3">
        <div className="row">
          <div className="col-md-6 col-lg-12">{props.componentBlock1}</div>
          <div className="col-md-6 col-lg-12">{props.componentBlock2}</div>
        </div>
      </div>
      {props.children}
    </div>
  );
};

Home.propTypes = {
  componentBlock1: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
  componentBlock2: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Home;
