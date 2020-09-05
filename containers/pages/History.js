import React from 'react';
import PropTypes from 'prop-types';
import History from 'components/pages/History';
import HistoryItem from 'components/includes/History-Item';
import { connect } from 'react-redux';

const HistoryContainer = (props) => {
  const { transactions } = props;

  const renderValueTable = (arr) => {
    let result = null;
    result = arr.map((transaction) => {
      return <HistoryItem key={transaction._id} transaction={transaction} />;
    });
    return result;
  };

  return <History>{renderValueTable(transactions.reverse())}</History>;
};

HistoryContainer.propTypes = {
  transactions: PropTypes.array,
};

HistoryContainer.defaultProps = {
  transactions: [],
};

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions.data,
  };
};

export default connect(mapStateToProps)(HistoryContainer);
