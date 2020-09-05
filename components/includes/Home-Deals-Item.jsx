import { formatDateMark } from 'helpers/datetime';
import PropTypes from 'prop-types';
import React from 'react';

const HomeDealsItem = (props) => {
  const { infoJar, transaction } = props;

  return (
    <div className="d-flex justify-content-between py-2">
      <div className="d-flex">
        <div className="mr-2 mt-1">
          <button type="button" className="btn btn-secondary btn-sm">
            <i
              className="fa fa-flask"
              aria-hidden="true"
              style={{ color: infoJar ? infoJar.color : '#000' }}
            />
          </button>
        </div>
        <div>
          <div className="text-13 weight-700">
            {transaction.type === 'income' ? 'Thu nhập' : infoJar.name}
          </div>
          <div className="text-11">{transaction.description || '...'}</div>
        </div>
      </div>
      <div className="text-right">
        <div
          className={`text-12 ${
            transaction.type === 'income' ? 'text-success' : 'text-danger'
          } weight-700`}
        >
          {transaction.type === 'income' ? '+' : '-'}{' '}
          {Number(transaction.money).toLocaleString('vi')} <u>đ</u>
        </div>
        <div className="text-12">{formatDateMark(transaction.date, '/')}</div>
      </div>
    </div>
  );
};

HomeDealsItem.propTypes = {
  infoJar: PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
  }),
  transaction: PropTypes.shape({
    type: PropTypes.string.isRequired,
    money: PropTypes.number.isRequired,
    jar: PropTypes.string,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
};

HomeDealsItem.defaultProps = {
  infoJar: {
    color: '',
    name: '',
  },
  transaction: {
    jar: '',
  },
};

export default HomeDealsItem;
