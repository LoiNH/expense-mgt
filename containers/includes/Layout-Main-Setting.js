import bcrypt from 'bcryptjs';
import LayoutMainSetting from 'components/includes/Layout-Main-Setting';
import * as ALERT from 'constants/alert';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadingToggle } from 'redux/general/action';
import { setUser } from 'redux/user/action';
import { getUser, updateUser } from 'utils/firebase';

const salt = bcrypt.genSaltSync(10);
const initInputPass = {
  user_pass: '',
  user_newPass: '',
  user_reNewPass: '',
};

const LayoutMainSettingContainer = (props) => {
  const [alert, setAlert] = useState(ALERT.ALERT_DEFAULT);
  const [inputValues, setInputValues] = useState({
    display_name: props.user.display_name,
  });
  const [inputPass, setInputPass] = useState({ ...initInputPass });

  const handleSaveChanges = () => {
    const { _id } = props.user;
    props.loadingToggle(true);
    setAlert(ALERT.ALERT_DEFAULT);
    setTimeout(async () => {
      const update = await updateUser(_id, inputValues);
      props.setUser(update);
      setAlert(ALERT.UPDATE_DATA_SUCCESS);
      props.loadingToggle(false);
    }, 500);
  };

  const handleChangePass = () => {
    const { _id } = props.user;
    const { user_pass, user_newPass, user_reNewPass } = inputPass;
    props.loadingToggle(true);
    setAlert(ALERT.ALERT_DEFAULT);
    setTimeout(async () => {
      if (user_newPass === user_reNewPass) {
        const user = await getUser(_id);
        if (bcrypt.compareSync(user_pass, user.user_pass)) {
          const hash = bcrypt.hashSync(user_newPass, salt);
          updateUser(_id, { user_pass: hash });

          setInputPass({ ...initInputPass });
          setAlert(ALERT.PASSWORD_CHANGE_SUCCESS);
        } else setAlert(ALERT.PASSWORD_VALIDATE_INCORRECT);
      } else setAlert(ALERT.PASSWORD_NOT_MATCH);
      props.loadingToggle(false);
    }, 500);
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const onChangePass = (e) => {
    const { value, name } = e.target;
    setInputPass({
      ...inputPass,
      [name]: value,
    });
  };

  return (
    <LayoutMainSetting
      alert={alert}
      handleChangePass={handleChangePass}
      handleSaveChanges={handleSaveChanges}
      inputValues={inputValues}
      inputPass={inputPass}
      onChange={onChange}
      onChangePass={onChangePass}
      user={props.user}
    />
  );
};

LayoutMainSettingContainer.propTypes = {
  loadingToggle: PropTypes.func,
  setUser: PropTypes.func,
  user: PropTypes.shape({
    _id: PropTypes.string,
    display_name: PropTypes.string,
  }),
};

LayoutMainSettingContainer.defaultProps = {
  loadingToggle: null,
  setUser: null,
  user: {
    _id: '',
    display_name: '',
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
    setUser: bindActionCreators((user) => setUser(user), dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutMainSettingContainer);
