import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';

const HomeBalances = (props) => {
  const { totalIncome, totalExpense } = props;
  const expensePercent = parseFloat(Number(totalExpense / (totalIncome / 100)).toFixed(2));
  const incomePercent = 100 - expensePercent;

  return (
    <div className="expense-main-block shadow rounded bg-white p-3 mt-2">
      <div className="row">
        <div className="col-12">
          <Doughnut
            data={{
              labels: ['Thu Nhập', 'Chi tiêu'],
              datasets: [
                {
                  backgroundColor: ['#5e72e4', '#f5365c'],
                  data: [incomePercent, expensePercent],
                },
              ],
            }}
            cutoutPercentage={0}
            options={{
              legend: {
                onClick: null,
              },
              plugins: {
                labels: {
                  render: () => {
                    return '';
                  },
                },
              },
            }}
          />
        </div>
        <div className="col-12 mt-2 mb-3 text-center">
          <span className="text-12 text-uppercase">Số dư khả dụng</span>
          <h2 className="mb-0 weight-700">
            {Number(totalIncome - totalExpense).toLocaleString('vi')} <u>đ</u>
          </h2>
        </div>
        <div className="col-12">{props.children}</div>
      </div>
    </div>
  );
};

HomeBalances.propTypes = {
  totalIncome: PropTypes.number.isRequired,
  totalExpense: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default HomeBalances;
