import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HomeBalances from 'components/includes/Home-Balances';
import HomeBalancesModal from 'containers/includes/Home-Balances-Modal';
import { connect } from 'react-redux';
import { JARS, GROUPS } from 'constants/general';
import { getDateNow } from 'helpers/datetime';
import { objectTotalValues } from 'helpers/object';

const InitInputValues = {
  money: 0,
  jar: 'necessities',
  group: '',
  date: getDateNow(),
  description: '',
  transfer: 'saving',
  receive: 'necessities',
};

const HomeBalancesContainer = (props) => {
  const [inputValues, setInputValues] = useState(() => {
    const setting = JSON.parse(localStorage.getItem('.balance_setting'));
    if (setting) return { ...setting, date: getDateNow() };
    return {
      ...InitInputValues,
      noGlass: false,
    };
  });

  const { income, expense } = props.balance;
  const totalIncome = objectTotalValues(income);
  const totalExpense = objectTotalValues(expense);

  const renderJarsSelect = (jars) => {
    let result = null;
    result = jars.map((jar) => {
      return (
        <option key={jar.nameCode} value={jar.nameCode}>
          {jar.name} -{' '}
          {Number(
            props.balance.income[jar.nameCode] - props.balance.expense[jar.nameCode],
          ).toLocaleString('vi')}{' '}
          đ
        </option>
      );
    });
    return result;
  };

  const renderGroupsSelect = (groups) => {
    let result = null;
    result = groups.map((group) => {
      if (group.parent === inputValues.jar)
        return (
          <option key={group.nameCode} value={group.nameCode}>
            {group.name}
          </option>
        );
      return null;
    });
    result.unshift(
      <option key="none" value="">
        Chọn nhóm
      </option>,
    );
    result.push(
      <option key="other" value="other">
        Khác
      </option>,
    );
    return result;
  };

  const onChange = (e) => {
    let { value } = e.target;
    const { name } = e.target;
    if (name === 'money') value = parseInt(value, 10) || 0;
    if (name === 'noGlass') value = !inputValues[name];
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  return (
    <HomeBalances totalIncome={totalIncome} totalExpense={totalExpense}>
      <HomeBalancesModal
        balance={props.balance}
        inputValues={inputValues}
        setInputValues={(value) => setInputValues(value)}
        onChange={onChange}
        renderJarsSelect={renderJarsSelect(JARS)}
        renderGroupsSelect={renderGroupsSelect(GROUPS)}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />
    </HomeBalances>
  );
};

HomeBalancesContainer.propTypes = {
  balance: PropTypes.shape({
    expense: PropTypes.shape({}),
    income: PropTypes.shape({}),
  }),
};

HomeBalancesContainer.defaultProps = {
  balance: {
    expense: {},
    income: {},
  },
};

const mapStateToProps = (state) => {
  return {
    balance: state.user.balance,
  };
};

export default connect(mapStateToProps)(HomeBalancesContainer);
