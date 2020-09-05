import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const Report = (props) => {
  const { inputValues } = props;
  const { time } = inputValues;

  return (
    <div className="expense-main-block shadow rounded bg-white p-3 mt-2">
      <span className="mb-0 text-12 weight-600 text-uppercase">Báo cáo thu chi</span>
      <div className="row mt-3 px-4">
        <div className="col-md-6">
          <div className="form-group mb-2 w-50">
            <b className="text-11 mb-2 text-uppercase">Lọc theo thời gian</b>
            <div className="input-group input-group-merge input-group-alternative w-80">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i
                    style={{ fontSize: '0.675rem' }}
                    className="fa fa-calendar-o"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <select
                className="form-control form-control-sm"
                name="time"
                value={inputValues.time}
                onChange={props.onChange}
              >
                <option value="recent">Gần đây</option>
                <option value="day">Ngày</option>
                <option value="month">Tháng</option>
                <option value="year">Năm</option>
              </select>
            </div>
          </div>
          <div className="d-flex">
            <div className="form-group mb-2 w-20 mr-2">
              <b className="text-11 mb-2 text-uppercase">Hiển thị</b>
              <div className="input-group input-group-merge input-group-alternative">
                <input
                  className="form-control form-control-sm"
                  placeholder={0}
                  type="number"
                  required
                  name="show"
                  value={inputValues.show}
                  onChange={props.onChange}
                />
              </div>
            </div>
            {time === 'day' ? (
              <div className="form-group mb-2 mr-2">
                <b className="text-11 mb-2 text-uppercase">Tháng</b>
                <div className="input-group input-group-merge input-group-alternative">
                  <select
                    className="form-control form-control-sm"
                    name="month"
                    value={inputValues.month}
                    onChange={props.onChange}
                  >
                    <option value="1">T1</option>
                    <option value="2">T2</option>
                    <option value="3">T3</option>
                    <option value="4">T4</option>
                    <option value="5">T5</option>
                    <option value="6">T6</option>
                    <option value="7">T7</option>
                    <option value="8">T8</option>
                    <option value="9">T9</option>
                    <option value="10">T10</option>
                    <option value="11">T11</option>
                    <option value="12">T12</option>
                  </select>
                </div>
              </div>
            ) : null}
            {time === 'month' || time === 'day' ? (
              <div className="form-group mb-2">
                <b className="text-11 mb-2 text-uppercase">Năm</b>
                <div className="input-group input-group-merge input-group-alternative">
                  <select
                    className="form-control form-control-sm"
                    name="year"
                    value={inputValues.year}
                    onChange={props.onChange}
                  >
                    {props.renderSelectYear}
                  </select>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="col" />
        <div className="col-md-4 d-none d-lg-block text-center">
          <Doughnut
            data={{
              labels: props.JarsName,
              datasets: [
                {
                  backgroundColor: props.JarsColor,
                  data: props.subtractArr,
                },
              ],
            }}
            cutoutPercentage={0}
            options={{
              legend: {
                display: true,
                position: 'left',
                labels: {
                  fontSize: 9,
                },
              },
              plugins: {
                labels: {
                  render: 'percentage',
                  fontColor: '#fff',
                  fontSize: 10,
                  fontStyle: 'bold',
                },
              },
            }}
          />
          <div className="text-13 mt-2 weight-700">
            {Number(props.totalSubtractArr).toLocaleString('vi')} <u>đ</u>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
};

Report.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  inputValues: PropTypes.shape({
    time: PropTypes.string.isRequired,
    show: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  subtractArr: PropTypes.array.isRequired,
  totalSubtractArr: PropTypes.number.isRequired,
  JarsName: PropTypes.array.isRequired,
  JarsColor: PropTypes.array.isRequired,
  renderSelectYear: PropTypes.array.isRequired,
};

export default Report;
