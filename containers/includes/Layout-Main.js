import LayoutMain from 'components/includes/Layout-Main';
import Loading from 'components/includes/Loading';
import * as PATH from 'constants/path';
import * as TEXT from 'constants/text';
import Layout from 'containers/includes/Layout';
import LayoutMainSetting from 'containers/includes/Layout-Main-Setting';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { createElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadingToggle } from 'redux/general/action';
import { removeUser, setUser } from 'redux/user/action';
import { getUser, getTransactions } from 'utils/firebase';
import { setTransactions } from 'redux/transactions/action';
import Footer from 'containers/includes/Footer';

const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;

const LayoutMainContainer = (props) => {
  const router = useRouter();

  const handleLogout = () => {
    props.loadingToggle(true);
    setTimeout(() => {
      props.removeUser();
      router.push(PATH.LOGIN_PAGE);
      props.loadingToggle(false);
    }, 300);
  };

  useEffect(() => {
    const storage =
      JSON.parse(localStorage.getItem('.config_user')) ||
      JSON.parse(sessionStorage.getItem('.config_user')) ||
      null;
    if (storage) {
      jwt.verify(storage, PRIVATE_KEY, (err, decoded) => {
        if (err) router.push(PATH.LOGIN_PAGE);
        if (decoded)
          getUser(decoded).then((user) => {
            if (user) {
              props.setUser(user);
              getTransactions(user._id).then((transaction) => {
                props.setTransactions(transaction);
              });
            } else router.push(PATH.LOGIN_PAGE);
          });
      });
    } else router.push(PATH.LOGIN_PAGE);
  }, [props.user._id]);

  if (!props.user._id)
    return (
      <Layout title={TEXT.LOADING_TEXT}>
        <Loading />
      </Layout>
    );
  return (
    <Layout title={props.title}>
      <LayoutMain
        pathname={router.pathname}
        user={props.user}
        handleLogout={handleLogout}
        componentFooter={<Footer />}
        componentSetting={<LayoutMainSetting />}
      >
        {props.children}
      </LayoutMain>
    </Layout>
  );
};

LayoutMainContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  loadingToggle: PropTypes.func,
  removeUser: PropTypes.func,
  setUser: PropTypes.func,
  setTransactions: PropTypes.func,
  title: PropTypes.string,
  user: PropTypes.shape({
    _id: PropTypes.string,
  }),
};

LayoutMainContainer.defaultProps = {
  children: createElement('div'),
  loadingToggle: null,
  removeUser: null,
  setUser: null,
  setTransactions: null,
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
    loadingToggle: bindActionCreators((toggle) => loadingToggle(toggle), dispatch),
    removeUser: bindActionCreators(removeUser, dispatch),
    setUser: bindActionCreators((user) => setUser(user), dispatch),
    setTransactions: bindActionCreators((data) => setTransactions(data), dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutMainContainer);
