import React from 'react';
import PropTypes from 'prop-types';
import { formatDateMark } from 'helpers/datetime';

const HistoryItem = (props) => {
  const { transaction } = props;

  return (
    <tr>
      <td className="weight-700">{transaction.type === 'income' ? 'Thu nhập' : 'Chi tiêu'}</td>
      <td
        className={`weight-700 ${transaction.type === 'income' ? 'text-success' : 'text-danger'}`}
      >
        {transaction.type === 'income' ? '+' : '-'} {Number(transaction.money).toLocaleString('vi')}{' '}
        đ
      </td>
      <td>Thiết yếu</td>
      <td>Ăn uống</td>
      <td>{transaction.description ? transaction.description : '...'}</td>
      <td>{formatDateMark(transaction.date, '/')}</td>
      <td>
        <button type="button" className="btn btn-warning btn-sm">
          Sửa
        </button>
        <button type="button" className="btn btn-danger btn-sm">
          Xóa
        </button>
      </td>
    </tr>
  );
};

HistoryItem.propTypes = {};

export default HistoryItem;
