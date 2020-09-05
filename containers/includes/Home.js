import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import LayoutMain from 'containers/includes/Layout-Main';
import Home from 'components/includes/Home';
import HomeBalances from 'containers/includes/Home-Balances';
import HomeDeals from 'containers/includes/Home-Deals';

const HomeContainer = (props) => {
  return (
    <LayoutMain title={props.title}>
      <Home componentBlock1={<HomeBalances />} componentBlock2={<HomeDeals />}>
        {props.children}
      </Home>
    </LayoutMain>
  );
};

HomeContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  title: PropTypes.string,
};

HomeContainer.defaultProps = {
  children: createElement('div'),
  title: '',
};

export default HomeContainer;
