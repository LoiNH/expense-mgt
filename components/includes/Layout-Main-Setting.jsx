import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const LayoutMainSetting = (props) => {
  const { user, inputValues, inputPass } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="mr-0" variant="primary" size="sm" onClick={handleShow}>
        <i className="fa fa-user" aria-hidden="true" /> Cài Đặt
      </Button>
      <Modal animation={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cài Đặt</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-2">
          <div className="px-3 pt-2">
            <div className="mb-0 text-14 weight-800 text-uppercase mb-3">Cài đặt tài khoản</div>
            <div className="text-center">
              {props.alert.status !== 'none' ? (
                <b
                  className={`d-block text-13 ${
                    props.alert.status === 'error' ? 'text-danger' : 'text-success'
                  } w-75 mx-auto`}
                >
                  {props.alert.text}
                </b>
              ) : null}
            </div>
            <div className="form-group mb-2 d-flex justify-content-between align-items-center mt-3">
              <div className="mb-0 text-12 weight-600 text-uppercase">Tên đăng nhập:</div>
              <div className="input-group input-group-merge input-group-alternative w-70">
                <input
                  className="form-control form-control-sm"
                  placeholder="Tên đăng nhập..."
                  type="text"
                  defaultValue={user.user_login}
                  disabled
                />
              </div>
            </div>
            <div className="form-group mb-2 d-flex justify-content-between align-items-center">
              <div className="mb-0 text-12 weight-600 text-uppercase">Email:</div>
              <div className="input-group input-group-merge input-group-alternative w-70">
                <input
                  className="form-control form-control-sm"
                  placeholder="Email..."
                  type="email"
                  defaultValue={user.user_email}
                  disabled
                />
              </div>
            </div>
            <div className="form-group mb-2 d-flex justify-content-between align-items-center">
              <div className="mb-0 text-12 weight-600 text-uppercase">Tên hiển thị:</div>
              <div className="input-group input-group-merge input-group-alternative w-70">
                <input
                  className="form-control form-control-sm"
                  placeholder="Tên hiển thị..."
                  type="text"
                  name="display_name"
                  value={inputValues.display_name}
                  onChange={props.onChange}
                />
              </div>
            </div>
            <div className="form-group mb-2 d-flex justify-content-between align-items-center">
              <div className="mb-0 text-12 weight-600 text-uppercase">Đổi mật khẩu:</div>
              <div className="w-70">
                <div className="d-block input-group input-group-merge input-group-alternative mb-2">
                  <input
                    className="form-control form-control-sm"
                    placeholder="Mật khẩu cũ..."
                    type="password"
                    name="user_pass"
                    value={inputPass.user_pass}
                    onChange={props.onChangePass}
                  />
                </div>
                <div className="d-block input-group input-group-merge input-group-alternative mb-2">
                  <input
                    className="form-control form-control-sm"
                    placeholder="Mật khẩu mới..."
                    type="password"
                    name="user_newPass"
                    value={inputPass.user_newPass}
                    onChange={props.onChangePass}
                  />
                </div>
                <div className="d-block input-group input-group-merge input-group-alternative mb-2">
                  <input
                    className="form-control form-control-sm"
                    placeholder="Nhập lại mật khẩu..."
                    type="password"
                    name="user_reNewPass"
                    value={inputPass.user_reNewPass}
                    onChange={props.onChangePass}
                  />
                </div>
                <Button variant="primary" size="sm" onClick={props.handleChangePass}>
                  Đổi mật khẩu
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={props.handleSaveChanges}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

LayoutMainSetting.propTypes = {
  alert: PropTypes.shape({
    status: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  handleChangePass: PropTypes.func.isRequired,
  handleSaveChanges: PropTypes.func.isRequired,
  inputValues: PropTypes.shape({
    display_name: PropTypes.string.isRequired,
  }).isRequired,
  inputPass: PropTypes.shape({
    user_pass: PropTypes.string.isRequired,
    user_newPass: PropTypes.string.isRequired,
    user_reNewPass: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onChangePass: PropTypes.func.isRequired,
  user: PropTypes.shape({
    user_email: PropTypes.string.isRequired,
    user_login: PropTypes.string.isRequired,
    display_name: PropTypes.string.isRequired,
  }).isRequired,
};

export default LayoutMainSetting;
