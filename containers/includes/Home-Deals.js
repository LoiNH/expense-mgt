import React from 'react';
import PropTypes from 'prop-types';
import HomeDeals from 'components/includes/Home-Deals';
import HomeDealsItems from 'containers/includes/Home-Deals-Item';
import { connect } from 'react-redux';

const HomeDealsContainer = (props) => {
  const renderDealsItems = (arr) => {
    let result = null;
    let newArr = arr.filter((tran) => tran.type !== 'move-money');
    newArr = newArr.slice(Math.max(newArr.length - 3, 0)).reverse();
    result = newArr.map((tran) => {
      return <HomeDealsItems key={tran._id} transaction={tran} />;
    });
    return result;
  };
  return <HomeDeals>{renderDealsItems(props.transactions.data)}</HomeDeals>;
};

HomeDealsContainer.propTypes = {
  transactions: PropTypes.shape({
    data: PropTypes.array,
    length: PropTypes.number,
  }),
};

HomeDealsContainer.defaultProps = {
  transactions: {
    data: [],
    length: 0,
  },
};

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions,
  };
};

export default connect(mapStateToProps)(HomeDealsContainer);
