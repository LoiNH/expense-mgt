import Auth from 'components/includes/Auth';
import * as PATH from 'constants/path';
import Layout from 'containers/includes/Layout';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { createElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeUser } from 'redux/user/action';
import { getUser } from 'utils/firebase';

const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;

const AuthContainer = (props) => {
  const router = useRouter();

  useEffect(() => {
    const storage =
      JSON.parse(localStorage.getItem('.config_user')) ||
      JSON.parse(sessionStorage.getItem('.config_user')) ||
      null;
    if (storage) {
      jwt.verify(storage, PRIVATE_KEY, (err, decoded) => {
        if (err) props.removeUser();
        if (decoded)
          getUser(decoded).then((user) => {
            if (user) router.push(PATH.HOME_PAGE);
          });
      });
    }
  }, []);

  return (
    <Layout title={props.title}>
      <Auth title={props.title} slogan={props.slogan} alert={props.alert}>
        {props.children}
      </Auth>
    </Layout>
  );
};

AuthContainer.propTypes = {
  alert: PropTypes.shape({
    status: PropTypes.string,
    text: PropTypes.string,
  }),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  removeUser: PropTypes.func,
  slogan: PropTypes.string,
  title: PropTypes.string,
  user: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

AuthContainer.defaultProps = {
  alert: {
    status: '',
    text: '',
  },
  children: createElement('div'),
  removeUser: null,
  slogan: '',
  title: '',
  user: {
    _id: '',
  },
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: bindActionCreators(removeUser, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
