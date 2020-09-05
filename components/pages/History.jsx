import React from 'react';
import PropTypes from 'prop-types';

const History = (props) => {
  return (
    <div className="expense-main-block shadow rounded bg-white p-3 mt-2">
      <span className="mb-0 text-12 weight-600 text-uppercase">Lịch sử giao dịch</span>
      <div className="mt-4">
        {/* <div className="row mb-2">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-4">
                <div className="d-flex">
                  <div className="form-group mb-2 mr-2">
                    <b className="text-11 mb-2 text-uppercase">Tháng</b>
                    <div className="input-group input-group-merge input-group-alternative">
                      <select className="form-control form-control-sm" name="month">
                        <option value="1">Tất cả</option>
                        <option value="1">T1</option>
                        <option value="2">T2</option>
                        <option value="3">T3</option>
                        <option value="4">T4</option>
                        <option value="5">T5</option>
                        <option value="6">T6</option>
                        <option value="7">T7</option>
                        <option value="8">T8</option>
                        <option value="9">T9</option>
                        <option value="10">T10</option>
                        <option value="11">T11</option>
                        <option value="12">T12</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group mb-2 mr-2">
                    <b className="text-11 mb-2 text-uppercase">Năm</b>
                    <div className="input-group input-group-merge input-group-alternative">
                      <select className="form-control form-control-sm" name="month">
                        <option value="11">Tất cả</option>
                        <option value="11">2020</option>
                        <option value="12">2021</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="d-flex">
                  <div className="form-group mb-2 mr-2">
                    <b className="text-11 mb-2 text-uppercase">Loại</b>
                    <div className="input-group input-group-merge input-group-alternative">
                      <select className="form-control form-control-sm" name="month">
                        <option value="1">Tất cả</option>
                        <option value="1">Thu nhập</option>
                        <option value="1">Chi tiêu</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group mb-2 mr-2">
                    <b className="text-11 mb-2 text-uppercase">Hũ</b>
                    <div className="input-group input-group-merge input-group-alternative">
                      <select className="form-control form-control-sm" name="month">
                        <option value="1">Tất cả</option>
                        <option value="1">Thiết yếu</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group mb-2 mr-2">
                    <b className="text-11 mb-2 text-uppercase">Nhóm</b>
                    <div className="input-group input-group-merge input-group-alternative">
                      <select className="form-control form-control-sm" name="month">
                        <option value="11">Tất cả</option>
                        <option value="12">Ăn uống</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-end align-items-end">
            <div className="form-group mb-2 d-flex align-items-center justify-content-end">
              <b className="text-11 text-uppercase">Hiển thị</b>
              <div
                className="input-group input-group-merge input-group-alternative mx-1"
                style={{ width: '50px' }}
              >
                <input
                  className="form-control form-control-sm"
                  placeholder={0}
                  type="number"
                  required
                  name="show"
                />
              </div>
              <b className="text-11 text-uppercase">mục</b>
            </div>
          </div>
        </div> */}
        <table className="table table-striped table-inverse table-bordered table-hover table-responsive-md">
          <thead className="thead-inverse">
            <tr>
              <th>Loại</th>
              <th>Số tiền</th>
              <th>Hũ</th>
              <th>Nhóm</th>
              <th>Mô tả</th>
              <th>Thời gian</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>{props.children}</tbody>
        </table>
        {/* <div className="d-flex justify-content-between">
          <b className="text-12 text-uppercase">Trang 1/10</b>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item active">
                <a className="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </nav>
        </div> */}
      </div>
    </div>
  );
};

History.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default History;
