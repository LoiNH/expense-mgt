import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import * as PATH from 'constants/path';

const Index = (props) => {
  return (
    <>
      <div className="col-md-6 col-lg-6 order-2 order-md-1">
        <div className="row">
          <div className="col-md-12">{props.componentBlock1}</div>
          <div className="col-md-12">
            <div className="expense-main-block shadow rounded bg-white p-3 mt-2">
              <span className="mb-0 text-12 weight-600 text-uppercase">Báo cáo thu chi</span>
              {props.componentBlock2}
              <Link href={PATH.REPORT_PAGE}>
                <button type="button" className="btn btn-primary btn-block btn-sm mt-2">
                  Xem thêm <i className="fa fa-arrow-right" aria-hidden="true" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3 order-1 order-md-2">{props.componentBlock3}</div>
    </>
  );
};

Index.propTypes = {
  componentBlock1: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
  componentBlock2: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
  componentBlock3: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
};

export default Index;
