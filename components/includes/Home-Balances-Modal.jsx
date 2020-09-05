import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const HomeBalancesModal = (props) => {
  const { inputValues } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="d-flex justify-content-around">
      <Button
        variant="primary"
        size="sm"
        block
        onClick={() => {
          props.setTab('income');
          handleShow();
        }}
      >
        <div className="text-11">
          <i className="fa fa-plus-circle" aria-hidden="true" /> Thu Nhập
        </div>
        <span className="mb-0">
          {Number(props.totalIncome).toLocaleString('vi')} <u>đ</u>
        </span>
      </Button>
      <Button
        className="mt-0"
        variant="danger"
        size="sm"
        block
        onClick={() => {
          props.setTab('expense');
          handleShow();
        }}
      >
        <div className="text-11">
          <i className="fa fa-minus-circle" aria-hidden="true" /> Chi Tiêu
        </div>
        <span className="mb-0">
          {Number(props.totalExpense).toLocaleString('vi')} <u>đ</u>
        </span>
      </Button>

      <Modal animation={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Giao Dịch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={props.onSubmit}>
            <div className="mx-auto text-center mb-3 w-80">
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
            <div className="row">
              <div className="col-4">
                <Button
                  variant={props.tab === 'income' ? 'primary' : 'outline-dark'}
                  size="sm"
                  block
                  onClick={() => props.setTab('income')}
                >
                  Thu Nhập
                </Button>
                <Button
                  variant={props.tab === 'expense' ? 'primary' : 'outline-dark'}
                  size="sm"
                  block
                  onClick={() => props.setTab('expense')}
                >
                  Chi Tiêu
                </Button>
                <Button
                  variant={props.tab === 'move-money' ? 'primary' : 'outline-dark'}
                  size="sm"
                  block
                  onClick={() => props.setTab('move-money')}
                >
                  Chuyển Hũ
                </Button>
              </div>
              <div className="col-8">
                {props.tab === 'move-money' ? (
                  <>
                    <div className="form-group mb-4">
                      <b className="text-11 mb-2 text-uppercase">Hũ chuyển</b>
                      <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-flask" aria-hidden="true" />
                          </span>
                        </div>
                        <select
                          className="form-control"
                          name="transfer"
                          value={inputValues.transfer}
                          onChange={props.onChange}
                        >
                          {props.renderJarsSelect}
                        </select>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center my-2">
                      <i className="fa fa-arrow-down" aria-hidden="true" />
                    </div>
                    <div className="form-group mb-2">
                      <b className="text-11 mb-2 text-uppercase">Hũ nhận</b>
                      <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-flask" aria-hidden="true" />
                          </span>
                        </div>
                        <select
                          className="form-control"
                          name="receive"
                          value={inputValues.receive}
                          onChange={props.onChange}
                        >
                          {props.renderJarsSelect}
                        </select>
                      </div>
                    </div>
                  </>
                ) : null}
                <div className="form-group mb-2">
                  <div className="input-group input-group-merge input-group-alternative">
                    <input
                      className="form-control"
                      placeholder={0}
                      type="number"
                      required
                      name="money"
                      value={inputValues.money}
                      onChange={props.onChange}
                    />
                  </div>
                </div>
                {props.tab === 'expense' ? (
                  <>
                    <div className="form-group mb-2">
                      <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-flask" aria-hidden="true" />
                          </span>
                        </div>
                        <select
                          className="form-control"
                          name="jar"
                          value={inputValues.jar}
                          onChange={props.onChange}
                        >
                          {props.renderJarsSelect}
                        </select>
                      </div>
                    </div>
                    <div className="form-group mb-2">
                      <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-cutlery" aria-hidden="true" />
                          </span>
                        </div>
                        <select
                          className="form-control"
                          name="group"
                          required
                          value={inputValues.group}
                          onChange={props.onChange}
                        >
                          {props.renderGroupsSelect}
                        </select>
                      </div>
                    </div>
                  </>
                ) : null}
                {props.tab !== 'move-money' ? (
                  <>
                    <div className="form-group mb-2">
                      <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-calendar-o" aria-hidden="true" />
                          </span>
                        </div>
                        <input
                          className="form-control"
                          type="date"
                          name="date"
                          value={inputValues.date}
                          onChange={props.onChange}
                        />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <div className="input-group input-group-merge input-group-alternative">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fa fa-pencil" aria-hidden="true" />
                          </span>
                        </div>
                        <input
                          className="form-control"
                          placeholder="Mô tả..."
                          type="text"
                          name="description"
                          value={inputValues.description}
                          onChange={props.onChange}
                        />
                      </div>
                    </div>
                  </>
                ) : null}
                {props.tab === 'income' ? (
                  <div className="d-flex text-13">
                    <div className="custom-control custom-checkbox mr-1">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="noGlass"
                        name="noGlass"
                        checked={inputValues.noGlass}
                        onChange={props.onChange}
                      />
                      <label className="custom-control-label" htmlFor="noGlass">
                        Không sử dụng hũ
                      </label>
                    </div>
                    <span className="weight-700">(vào hũ thiết yếu)</span>
                  </div>
                ) : null}
                {props.tab === 'move-money' ? (
                  <Button
                    className="text-capitalize mt-1"
                    variant="primary"
                    size="sm"
                    onClick={props.handleMoveAllMoney}
                  >
                    Chuyển toàn bộ tiền vào hũ nhận
                  </Button>
                ) : null}
              </div>
            </div>
            <div className="d-flex justify-content-between w-100 mt-5">
              <Button variant="outline-primary" onClick={props.handleSaveSettings}>
                Lưu Mặc Định
              </Button>
              <div>
                <Button variant="secondary" onClick={handleClose}>
                  Đóng
                </Button>
                <Button type="submit" variant="primary">
                  Lưu
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

HomeBalancesModal.propTypes = {
  alert: PropTypes.shape({
    status: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  inputValues: PropTypes.shape({
    money: PropTypes.number.isRequired,
    jar: PropTypes.string.isRequired,
    group: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    transfer: PropTypes.string.isRequired,
    receive: PropTypes.string.isRequired,
    noGlass: PropTypes.bool.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleSaveSettings: PropTypes.func.isRequired,
  handleMoveAllMoney: PropTypes.func.isRequired,
  renderJarsSelect: PropTypes.array.isRequired,
  renderGroupsSelect: PropTypes.array.isRequired,
  tab: PropTypes.string.isRequired,
  setTab: PropTypes.func.isRequired,
  totalIncome: PropTypes.number.isRequired,
  totalExpense: PropTypes.number.isRequired,
};

export default HomeBalancesModal;
