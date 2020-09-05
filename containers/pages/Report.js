import Report from 'components/pages/Report';
import { JARS } from 'constants/general';
import ReportElement from 'containers/includes/Report-Element';
import {
  arraySubtract2Arr,
  arrayTotal,
  arrayUniqueValue,
  sortArrayObjectDate,
} from 'helpers/array';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

const JarsName = JARS.map((jar) => jar.name);
const JarsColor = JARS.map((jar) => jar.color);

const InitInput = {
  time: 'recent',
  show: 6,
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear(),
};

const ReportContainer = (props) => {
  const [inputValues, setInputValues] = useState(() => {
    const data = JSON.parse(localStorage.getItem('.report_filter'));
    if (data) return data;
    return InitInput;
  });

  const sortedTransactions = sortArrayObjectDate(props.transactions);
  const getYear = arrayUniqueValue(
    sortedTransactions.map((res) => new Date(res.date).getFullYear()),
  );

  const renderSelectYear = (yearArr) => {
    let result = null;
    result = yearArr.map((year) => {
      return (
        <option key={year} value={year}>
          {year}
        </option>
      );
    });
    return result;
  };

  const { income, expense } = props.balance;
  const incomeArr = [];
  const expenseArr = [];
  JARS.forEach((jar) => {
    incomeArr.push(income[jar.nameCode]);
    expenseArr.push(expense[jar.nameCode]);
  });
  const subtractArr = arraySubtract2Arr(incomeArr, expenseArr);
  const totalSubtractArr = arrayTotal(subtractArr);

  const onChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === 'show' || name === 'month' || name === 'year') value = parseInt(value, 10) || 0;
    const newInput = {
      ...inputValues,
      [name]: value,
    };
    localStorage.setItem('.report_filter', JSON.stringify(newInput));
    setInputValues(newInput);
  };

  return (
    <Report
      inputValues={inputValues}
      setInputValues={(value) => setInputValues(value)}
      subtractArr={subtractArr}
      totalSubtractArr={totalSubtractArr}
      onChange={onChange}
      JarsName={JarsName}
      JarsColor={JarsColor}
      renderSelectYear={renderSelectYear(getYear)}
    >
      <ReportElement inputValues={inputValues} setYearData={(value) => setYearData(value)} />
    </Report>
  );
};

ReportContainer.propTypes = {
  balance: PropTypes.shape({
    income: PropTypes.shape({}),
    expense: PropTypes.shape({}),
  }),
  transactions: PropTypes.array,
};

ReportContainer.defaultProps = {
  balance: {
    income: {},
    expense: {},
  },
  transactions: [],
};

const mapStateToProps = (state) => {
  return {
    balance: state.user.balance,
    transactions: state.transactions.data,
  };
};

export default connect(mapStateToProps)(ReportContainer);
