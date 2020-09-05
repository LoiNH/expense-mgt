import React from 'react';
import PropTypes from 'prop-types';
import { formatDateMark } from 'helpers/datetime';
import { JARS, GROUPS } from 'constants/general';

const HistoryItem = (props) => {
  const { transaction } = props;

  let type;
  if (transaction.type === 'income') type = 'Thu nhập';
  if (transaction.type === 'expense') type = 'Chi tiêu';
  if (transaction.type === 'move-money') type = 'Chuyển tiền';

  let color;
  if (transaction.type === 'expense') color = 'text-danger';
  if (transaction.type === 'income') color = 'text-success';
  if (transaction.type === 'move-money') color = 'text-primary';

  let mark;
  if (transaction.type === 'expense') mark = '-';
  if (transaction.type === 'income') mark = '+';
  if (transaction.type === 'move-money') mark = '';

  let jarName;
  for (let i = 0; i < JARS.length; i += 1) {
    if (JARS[i].nameCode === transaction.jar) {
      jarName = JARS[i].name;
      break;
    }
  }

  let groupName;
  for (let i = 0; i < GROUPS.length; i += 1) {
    if (GROUPS[i].nameCode === transaction.group) {
      groupName = GROUPS[i].name;
      break;
    }
  }

  return (
    <tr>
      <td className="weight-700">{type}</td>
      <td className={`weight-700 ${color}`}>
        {mark} {Number(transaction.money).toLocaleString('vi')} đ
      </td>
      <td>{jarName}</td>
      <td>{groupName}</td>
      <td>{transaction.description ? transaction.description : '...'}</td>
      <td>{formatDateMark(transaction.date, '-')}</td>
      <td>
        <button
          onClick={() => props.handleDeleteTransaction(transaction._id)}
          type="button"
          className="btn btn-danger btn-sm"
        >
          Xóa
        </button>
      </td>
    </tr>
  );
};

HistoryItem.propTypes = {
  transaction: PropTypes.shape({
    _id: PropTypes.string,
    type: PropTypes.string,
    money: PropTypes.number,
    jar: PropTypes.string,
    group: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
  }),
  handleDeleteTransaction: PropTypes.func,
};
HistoryItem.defaultProps = {
  transaction: PropTypes.shape({
    _id: '',
    type: '',
    money: 0,
    jar: '',
    group: '',
    description: '',
    date: '',
  }),
  handleDeleteTransaction: null,
};

export default HistoryItem;
