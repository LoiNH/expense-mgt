import Report from 'components/includes/Report-Element';
import { arrayUniqueValue, sortArrayObjectDate } from 'helpers/array';
import { formatDateMark } from 'helpers/datetime';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const ReportElementContainer = (props) => {
  const { inputValues, transactions } = props;

  const dataIncome = [];
  const dataExpense = [];
  let labelsDate;
  const sortedTransactions = sortArrayObjectDate(transactions);

  if (inputValues.time === 'recent') {
    labelsDate = arrayUniqueValue(sortedTransactions.map((res) => res.date));
    for (let i = 0; i < labelsDate.length; i += 1) {
      let totalIncome = 0;
      let totalExpense = 0;
      for (let j = 0; j < sortedTransactions.length; j += 1) {
        if (labelsDate[i] === sortedTransactions[j].date) {
          if (sortedTransactions[j].type === 'income') totalIncome += sortedTransactions[j].money;
          if (sortedTransactions[j].type === 'expense') totalExpense += sortedTransactions[j].money;
        }
      }
      dataIncome.push(totalIncome);
      dataExpense.push(totalExpense);
    }
    labelsDate = labelsDate.map((res) => formatDateMark(res, '/'));
  } else if (inputValues.time === 'day') {
    labelsDate = sortedTransactions.filter((res) => {
      const year = new Date(res.date).getFullYear();
      const month = new Date(res.date).getMonth() + 1;
      if (inputValues.year === year && inputValues.month === month) return res;
      return null;
    });
    labelsDate = arrayUniqueValue(labelsDate.map((res) => res.date));
    for (let i = 0; i < labelsDate.length; i += 1) {
      let totalIncome = 0;
      let totalExpense = 0;
      for (let j = 0; j < sortedTransactions.length; j += 1) {
        if (labelsDate[i] === sortedTransactions[j].date) {
          if (sortedTransactions[j].type === 'income') totalIncome += sortedTransactions[j].money;
          if (sortedTransactions[j].type === 'expense') totalExpense += sortedTransactions[j].money;
        }
      }
      dataIncome.push(totalIncome);
      dataExpense.push(totalExpense);
    }
    labelsDate = labelsDate.map((res) => formatDateMark(res, '/'));
  } else if (inputValues.time === 'month') {
    labelsDate = sortedTransactions.filter((res) => {
      const year = new Date(res.date).getFullYear();
      if (inputValues.year === year) return res;
      return null;
    });
    labelsDate = arrayUniqueValue(labelsDate.map((res) => new Date(res.date).getMonth() + 1));
    for (let i = 0; i < labelsDate.length; i += 1) {
      let totalIncome = 0;
      let totalExpense = 0;
      for (let j = 0; j < sortedTransactions.length; j += 1) {
        if (labelsDate[i] === new Date(sortedTransactions[j].date).getMonth() + 1) {
          if (sortedTransactions[j].type === 'income') totalIncome += sortedTransactions[j].money;
          if (sortedTransactions[j].type === 'expense') totalExpense += sortedTransactions[j].money;
        }
      }
      dataIncome.push(totalIncome);
      dataExpense.push(totalExpense);
    }
    labelsDate = labelsDate.map((res) => `T${res}`);
  } else if (inputValues.time === 'year') {
    labelsDate = arrayUniqueValue(
      sortedTransactions.map((res) => new Date(res.date).getFullYear()),
    );
    for (let i = 0; i < labelsDate.length; i += 1) {
      let totalIncome = 0;
      let totalExpense = 0;
      for (let j = 0; j < sortedTransactions.length; j += 1) {
        if (labelsDate[i] === new Date(sortedTransactions[j].date).getFullYear()) {
          if (sortedTransactions[j].type === 'income') totalIncome += sortedTransactions[j].money;
          if (sortedTransactions[j].type === 'expense') totalExpense += sortedTransactions[j].money;
        }
      }
      dataIncome.push(totalIncome);
      dataExpense.push(totalExpense);
    }
  }

  labelsDate = labelsDate.slice(
    labelsDate.length > inputValues.show ? labelsDate.length - inputValues.show : 0,
    labelsDate.length,
  );

  return (
    <Report
      inputValues={inputValues}
      labelsDate={labelsDate}
      dataIncome={dataIncome}
      dataExpense={dataExpense}
    />
  );
};

ReportElementContainer.propTypes = {
  inputValues: PropTypes.shape({
    time: PropTypes.string,
    show: PropTypes.number,
    year: PropTypes.number,
    month: PropTypes.number,
  }),
  transactions: PropTypes.array,
};

ReportElementContainer.defaultProps = {
  inputValues: {
    time: 'recent',
    show: 6,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  },
  transactions: [],
};

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions.data,
  };
};

export default connect(mapStateToProps)(ReportElementContainer);
