import bcrypt from 'bcryptjs';
import Login from 'components/pages/Login';
import * as ALERT from 'constants/alert';
import * as PATH from 'constants/path';
import * as TEXT from 'constants/text';
import Auth from 'containers/includes/Auth';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadingToggle } from 'redux/general/action';
import { loginUser } from 'redux/user/action';
import { getUsers } from 'utils/firebase';

const LoginContainer = (props) => {
  const router = useRouter();
  const { register } = router.query;

  const [alert, setAlert] = useState(() => {
    if (register === 'success') return ALERT.USER_NEW_SUCCESS;
    return ALERT.ALERT_DEFAULT;
  });
  const [inputValues, setInputValues] = useState({
    user_email: '',
    user_pass: '',
  });
  const [rememberMe, setRememberMe] = useState(true);

  const handleUserLogin = async (users, { user_email, user_pass }) => {
    let user = null;
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].user_email === user_email) {
        const checkPass = bcrypt.compareSync(user_pass, users[i].user_pass);
        if (checkPass) user = users[i];
        break;
      }
    }
    return user;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setAlert(ALERT.ALERT_DEFAULT);
    props.loadingToggle(true);
    setTimeout(async () => {
      const users = await getUsers();
      const user = await handleUserLogin(users, inputValues);
      if (user) {
        props.loginUser(user, rememberMe);
        router.push(PATH.HOME_PAGE);
      } else setAlert(ALERT.USER_LOGIN_FAILED);
      props.loadingToggle(false);
    }, 300);
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  return (
    <Auth alert={alert} title={TEXT.LOGIN_TITLE} slogan={TEXT.LOGIN_SLOGAN}>
      <Login
        inputValues={inputValues}
        rememberMe={rememberMe}
        setRememberMe={() => setRememberMe(!rememberMe)}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </Auth>
  );
};

LoginContainer.propTypes = {
  loadingToggle: PropTypes.func,
  loginUser: PropTypes.func,
  user: PropTypes.shape({}),
};

LoginContainer.defaultProps = {
  loadingToggle: null,
  loginUser: null,
  user: {},
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: bindActionCreators((user, remember) => loginUser(user, remember), dispatch),
    loadingToggle: bindActionCreators((toggle) => loadingToggle(toggle), dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
