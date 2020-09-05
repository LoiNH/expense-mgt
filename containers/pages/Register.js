import bcrypt from 'bcryptjs';
import Register from 'components/pages/Register';
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
import { getUsers, newUser } from 'utils/firebase';

const salt = bcrypt.genSaltSync(10);

const RegisterContainer = (props) => {
  const router = useRouter();
  const [alert, setAlert] = useState(ALERT.ALERT_DEFAULT);
  const [inputValues, setInputValues] = useState({
    user_email: '',
    user_login: '',
    user_pass: '',
  });

  const checkUserNotExist = async (users, { user_login, user_email }) => {
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].user_login === user_login) {
        setAlert(ALERT.USER_USERNAME_EXISTS);
        return false;
      }
      if (users[i].user_email === user_email) {
        setAlert(ALERT.USER_EMAIL_EXISTS);
        return false;
      }
    }
    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setAlert(ALERT.ALERT_DEFAULT);
    props.loadingToggle(true);
    setTimeout(async () => {
      const users = await getUsers();
      const checkUser = await checkUserNotExist(users, inputValues);
      if (checkUser) {
        const hashPass = bcrypt.hashSync(inputValues.user_pass, salt);
        newUser({ ...inputValues, user_pass: hashPass }).then((res) => {
          if (res)
            router.push({
              pathname: PATH.LOGIN_PAGE,
              query: { register: 'success' },
            });
        });
      }
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
    <Auth alert={alert} title={TEXT.REGISTER_TITLE} slogan={TEXT.REGISTER_SLOGAN}>
      <Register inputValues={inputValues} onChange={onChange} onSubmit={onSubmit} />
    </Auth>
  );
};

RegisterContainer.propTypes = {
  loadingToggle: PropTypes.func,
};

RegisterContainer.defaultProps = {
  loadingToggle: null,
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingToggle: bindActionCreators((toggle) => loadingToggle(toggle), dispatch),
  };
};

export default connect(null, mapDispatchToProps)(RegisterContainer);
