import React, { useState } from 'react';
import PropTypes from 'prop-types';
import HomeBalancesModal from 'components/includes/Home-Balances-Modal';
import { loadingToggle } from 'redux/general/action';
import { bindActionCreators } from 'redux';
import * as ALERT from 'constants/alert';
import { connect } from 'react-redux';
import { updateUser, newTransaction } from 'utils/firebase';
import { setUser } from 'redux/user/action';
import { addTransactions } from 'redux/transactions/action';

const HomeBalancesModalContainer = (props) => {
  const { balance, inputValues } = props;
  const { expense, income, percent } = balance;
  const [tab, setTab] = useState('income');
  const [alert, setAlert] = useState(ALERT.ALERT_DEFAULT);

  const onSubmit = (e) => {
    e.preventDefault();
    setAlert(ALERT.ALERT_DEFAULT);
    props.loadingToggle(true);
    setTimeout(async () => {
      const type = tab;
      const {
        money,
        jar,
        group,
        date,
        description,
        transfer,
        receive,
        noGlass,
      } = props.inputValues;
      const { _id } = props.user;
      let saveTransaction;
      let saveUser;
      if (money !== 0) {
        if (type === 'income') {
          if (noGlass) {
            const newBalance = {
              ...balance,
              income: { ...income, necessities: money + income['necessities'] },
            };
            saveUser = await updateUser(_id, { balance: newBalance });
          } else {
            const moneyPercent = money / 100;
            const newJars = {};
            for (const key in percent)
              if (percent.hasOwnProperty(key))
                newJars[key] = moneyPercent * percent[key] + income[key];
            saveUser = await updateUser(_id, { balance: { ...balance, income: newJars } });
          }
          saveTransaction = await newTransaction(_id, { type, date, money, description });
          setAlert(ALERT.TRANSACTION_ADD_SUCCESS);
        } else if (type === 'expense') {
          for (const key in expense) {
            if (expense.hasOwnProperty(key)) {
              if (jar === key) {
                if (income[key] - expense[key] - money >= 0) {
                  expense[key] += money;
                  saveUser = await updateUser(_id, { balance: { ...balance, expense } });
                  saveTransaction = await newTransaction(_id, {
                    type,
                    date,
                    money,
                    jar,
                    group,
                    description,
                  });
                  setAlert(ALERT.TRANSACTION_ADD_SUCCESS);
                  break;
                } else setAlert(ALERT.TRANSACTION_LARGER_WALLET);
              }
            }
          }
        } else if (type === 'move-money') {
          if (money <= income[transfer]) {
            income[transfer] -= money;
            income[receive] += money;
            saveUser = await updateUser(_id, { balance: { ...balance, income } });
            saveTransaction = await newTransaction(_id, { type, money, date, transfer, receive });
            setAlert(ALERT.TRANSACTION_ADD_SUCCESS);
          } else setAlert(ALERT.TRANSACTION_LARGER_WALLET);
        }
        if (saveUser) props.setUser(saveUser);
        if (saveTransaction) props.addTransactions(saveTransaction);
      } else setAlert(ALERT.TRANSACTION_ADD_EMPTY);
      props.setInputValues({ ...props.inputValues, money: 0 });
      props.loadingToggle(false);
    }, 300);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('.balance_setting', JSON.stringify({ ...props.inputValues, money: 0 }));
    setAlert(ALERT.TRANSACTION_SAVESETTINGS_SUCCESS);
  };

  const handleMoveAllMoney = () =>
    props.setInputValues({ ...inputValues, money: income[inputValues.transfer] });

  return (
    <HomeBalancesModal
      alert={alert}
      handleSaveSettings={handleSaveSettings}
      handleMoveAllMoney={handleMoveAllMoney}
      inputValues={props.inputValues}
      onChange={props.onChange}
      onSubmit={onSubmit}
      renderJarsSelect={props.renderJarsSelect}
      renderGroupsSelect={props.renderGroupsSelect}
      tab={tab}
      setTab={(value) => setTab(value)}
      totalIncome={props.totalIncome}
      totalExpense={props.totalExpense}
    />
  );
};

HomeBalancesModalContainer.propTypes = {
  addTransactions: PropTypes.func,
  balance: PropTypes.shape({
    expense: PropTypes.shape({}),
    income: PropTypes.shape({
      necessities: PropTypes.number,
    }),
    percent: PropTypes.shape({}),
  }),
  inputValues: PropTypes.shape({
    money: PropTypes.number,
    jar: PropTypes.string,
    group: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    transfer: PropTypes.string,
    receive: PropTypes.string,
    noGlass: PropTypes.bool,
  }),
  setInputValues: PropTypes.func,
  loadingToggle: PropTypes.func,
  onChange: PropTypes.func,
  renderJarsSelect: PropTypes.array.isRequired,
  renderGroupsSelect: PropTypes.array.isRequired,
  totalIncome: PropTypes.number,
  totalExpense: PropTypes.number,
  user: PropTypes.shape({
    _id: PropTypes.string,
  }),
  setUser: PropTypes.func,
};

HomeBalancesModalContainer.defaultProps = {
  addTransactions: null,
  balance: {
    expense: {},
    income: {
      necessities: 0,
    },
    percent: {},
  },
  inputValues: {
    money: 0,
    jar: '',
    group: '',
    date: '',
    description: '',
    transfer: '',
    receive: '',
    noGlass: false,
    moveAll: false,
  },
  setInputValues: null,
  loadingToggle: null,
  onChange: null,
  totalIncome: 0,
  totalExpense: 0,
  user: {
    _id: '',
  },
  setUser: null,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    balance: state.user.balance,
    transactions: state.transactions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingToggle: bindActionCreators((toggle) => loadingToggle(toggle), dispatch),
    setUser: bindActionCreators((user) => setUser(user), dispatch),
    addTransactions: bindActionCreators((transaction) => addTransactions(transaction), dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeBalancesModalContainer);
