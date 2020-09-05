import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import * as PATH from 'constants/path';

const HomeDeals = (props) => {
  return (
    <div className="expense-main-block shadow rounded p-3 mt-2 bg-white">
      <span className="mb-0 text-12 weight-600 text-uppercase">Giao dịch mới nhất</span>
      <div className="expense-main-block-deals mt-3">
        {props.children}
        <Link href={PATH.HISTORY_PAGE}>
          <button type="button" className="btn btn-primary btn-block btn-sm mt-2">
            Xem thêm <i className="fa fa-arrow-right" aria-hidden="true" />
          </button>
        </Link>
      </div>
    </div>
  );
};

HomeDeals.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default HomeDeals;
