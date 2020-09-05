import HomeDealsItem from 'components/includes/Home-Deals-Item';
import { JARS } from 'constants/general';
import PropTypes from 'prop-types';
import React from 'react';

const HomeDealsItemContainer = (props) => {
  const { transaction } = props;

  const infoJar = () => {
    for (let i = 0; i < JARS.length; i += 1) {
      if (JARS[i].nameCode === transaction.jar) return JARS[i];
    }
    return null;
  };

  return <HomeDealsItem infoJar={infoJar()} transaction={props.transaction} />;
};

HomeDealsItemContainer.propTypes = {
  transaction: PropTypes.shape({
    type: PropTypes.string,
    money: PropTypes.number,
    jar: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
  }),
};

HomeDealsItemContainer.defaultProps = {
  transaction: {
    type: '',
    money: 0,
    jar: '',
    description: '',
    date: '',
  },
};

export default HomeDealsItemContainer;
