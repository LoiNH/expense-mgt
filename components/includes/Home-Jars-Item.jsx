import React from 'react';
import PropTypes from 'prop-types';

const HomeJarsItem = (props) => {
  const { jar } = props;

  return (
    <div className="form-group mb-2 d-flex justify-content-between align-items-center">
      <div className="mb-0 text-12 weight-600 text-uppercase" style={{ color: jar.color }}>
        {jar.name}:
      </div>
      <div className="input-group input-group-merge input-group-alternative w-30">
        <input
          className="form-control form-control-sm"
          type="number"
          name={jar.nameCode}
          value={props.value}
          onChange={props.onChange}
          max="100"
          min="0"
          required
        />
      </div>
    </div>
  );
};

HomeJarsItem.propTypes = {
  jar: PropTypes.shape({
    nameCode: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default HomeJarsItem;
