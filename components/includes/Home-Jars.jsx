import { JARS } from 'constants/general';
import PropTypes from 'prop-types';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-labels';

const JarsName = JARS.map((jar) => jar.name);
const JarsColor = JARS.map((jar) => jar.color);

const HomeJars = (props) => {
  return (
    <form onSubmit={props.onSubmit} className="expense-main-block shadow rounded bg-white p-3 mt-2">
      <div className="d-flex justify-content-between">
        <span className="mb-0 text-12 weight-600 text-uppercase">Thiết lập các hũ</span>
        <button type="submit" className="btn btn-primary btn-sm">
          Lưu
        </button>
      </div>
      <div className="px-3 pt-2">
        <div className="text-center mb-2">
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
        <div className="pb-3">
          <div className="row">
            <div className="col-lg-7">
              <div className="my-3 text-12 text-center weight-600">Tổng: {props.total}%</div>
              <Doughnut
                data={{
                  labels: [...JarsName, 'Chưa chọn'],
                  datasets: [
                    {
                      backgroundColor: [...JarsColor, '#2b2a34'],
                      data: [...props.dataCharts, props.remain],
                    },
                  ],
                }}
                cutoutPercentage={0}
                options={{
                  legend: {
                    display: false,
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
            </div>
            <div className="col-lg-5 pr-4">{props.children}</div>
          </div>
        </div>
      </div>
    </form>
  );
};

HomeJars.propTypes = {
  alert: PropTypes.shape({
    status: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  dataCharts: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  remain: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default HomeJars;
