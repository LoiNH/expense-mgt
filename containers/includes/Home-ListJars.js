import React from 'react';
import PropTypes from 'prop-types';
import HomeListJars from 'components/includes/Home-ListJars';
import HomeListJarsItem from 'components/includes/Home-ListJars-Item';
import { JARS } from 'constants/general';
import { connect } from 'react-redux';

const HomeListJarsContainer = (props) => {
  const { balance } = props;

  const renderHomeListJars = (jars) => {
    let result = null;
    result = jars.map((jar) => {
      const incomeBalance = balance.income[jar.nameCode];
      const expenseBalance = balance.expense[jar.nameCode];

      return (
        <HomeListJarsItem
          key={jar.nameCode}
          jar={jar}
          remain={incomeBalance - expenseBalance}
          percent={100 - parseFloat(Number((expenseBalance / incomeBalance) * 100).toFixed(2))}
        />
      );
    });
    return result;
  };

  return <HomeListJars>{renderHomeListJars(JARS)}</HomeListJars>;
};

HomeListJarsContainer.propTypes = {
  balance: PropTypes.shape({
    income: PropTypes.shape({}),
    expense: PropTypes.shape({}),
  }),
};

HomeListJarsContainer.defaultProps = {
  balance: {
    income: {},
    expense: {},
  },
};

const mapStateToProps = (state) => {
  return {
    balance: state.user.balance,
  };
};

export default connect(mapStateToProps)(HomeListJarsContainer);
