import React from 'react';
import PropTypes from 'prop-types';

const HomeListJarsItem = (props) => {
  const { jar } = props;

  return (
    <div className="progress-wrapper pt-2">
      <div className="progress-info">
        <div className="progress-label">
          <span style={{ color: jar.color }}>{jar.name}</span>
        </div>
        <div className="progress-percentage">
          <span className="text-12">
            {Number(props.remain).toLocaleString('vi')} <u>đ</u>
          </span>
        </div>
      </div>
      <div className="progress" style={{ height: '3px' }}>
        <div
          className="progress-bar"
          style={{
            width: `${props.percent}%`,
            backgroundColor: jar.color,
          }}
        />
      </div>
    </div>
  );
};

HomeListJarsItem.propTypes = {
  jar: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  remain: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
};

export default HomeListJarsItem;
