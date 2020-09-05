import React from 'react';
import PropTypes from 'prop-types';

const Auth = (props) => {
  const { alert } = props;

  return (
    <div
      className="expense-auth"
      style={{
        backgroundImage: 'url(./images/bg-auth.jpg)',
      }}
    >
      <div className="expense-auth-form bg-secondary p-4 rounded">
        <div className="text-center mb-3">
          <h2 className="text-uppercase mb-0">{props.title}</h2>
          <p className="text-13">{props.slogan}</p>
          {alert.status !== '' ? (
            <b
              className={`d-block text-13 ${
                alert.status === 'error' ? 'text-danger' : 'text-success'
              } w-75 mx-auto`}
            >
              {alert.text}
            </b>
          ) : null}
        </div>
        {props.children}
      </div>
    </div>
  );
};

Auth.propTypes = {
  alert: PropTypes.shape({
    status: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  slogan: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Auth;
