import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const ReportElement = (props) => {
  const { time, month, year } = props.inputValues;
  let text = 'Báo Cáo Thu Chi ';
  if (time === 'day') text += `T${month}/${year}`;
  if (time === 'month') text += `Năm ${year}`;

  return (
    <div className="expense-main-block-deals mt-3">
      <Line
        data={{
          labels: props.labelsDate,
          datasets: [
            {
              data: props.dataIncome,
              label: 'Thu nhập',
              borderColor: '#5e72e4',
              fill: false,
            },
            {
              data: props.dataExpense,
              label: 'Chi tiêu',
              borderColor: '#f5365c',
              fill: false,
            },
          ],
        }}
        options={{
          title: {
            display: true,
            text: `${text} (VNĐ)`,
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        }}
      />
    </div>
  );
};

ReportElement.propTypes = {
  inputValues: PropTypes.shape({
    time: PropTypes.string.isRequired,
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
  dataExpense: PropTypes.array.isRequired,
  dataIncome: PropTypes.array.isRequired,
  labelsDate: PropTypes.array.isRequired,
};

export default ReportElement;
