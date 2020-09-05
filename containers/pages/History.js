import React from 'react';
import PropTypes from 'prop-types';
import History from 'components/pages/History';
import HistoryItem from 'components/includes/History-Item';
import { connect } from 'react-redux';
import { getTransactions, deleteTransaction } from 'utils/firebase';
import { setTransactions } from 'redux/transactions/action';
import { bindActionCreators } from 'redux';

const HistoryContainer = (props) => {
  const { transactions } = props;

  const renderValueTable = (arr) => {
    let result = null;
    result = arr.map((transaction) => {
      return (
        <HistoryItem
          key={transaction._id}
          transaction={transaction}
          handleDeleteTransaction={handleDeleteTransaction}
        />
      );
    });
    return result;
  };

  const handleDeleteTransaction = async (_id) => {
    const { user } = props;
    await deleteTransaction(user._id, _id);
    getTransactions(user._id).then((transaction) => {
      props.setTransactions(transaction);
    });
  };

  return <History>{renderValueTable(transactions.reverse())}</History>;
};

HistoryContainer.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
  }),
  transactions: PropTypes.array,
  setTransactions: PropTypes.func,
};

HistoryContainer.defaultProps = {
  user: {
    _id: '',
  },
  transactions: [],
  setTransactions: null,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    transactions: state.transactions.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTransactions: bindActionCreators((user) => setTransactions(user), dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);
