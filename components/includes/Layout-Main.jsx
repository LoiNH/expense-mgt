import PropTypes from 'prop-types';
import React from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import * as PATH from 'constants/path';
import Link from 'next/link';

const Layout = (props) => {
  const { user } = props;

  return (
    <div className="expense-main py-3">
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 col-md-3">
            <div className="expense-main-head">
              <h4 className="mb-0">Xin chào {user.display_name}!</h4>
              <span className="text-13">Hôm nay bạn có gì mới không?</span>
            </div>
          </div>
          <div className="col-6 col-md-6 mt-2 mt-md-0 d-flex align-items-center">
            <Navbar className="p-0 text-14 ml-auto ml-md-0" expand="sm">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Link href={PATH.HOME_PAGE}>
                    <Nav.Link href={PATH.HOME_PAGE} active={props.pathname === PATH.HOME_PAGE}>
                      Trang chủ
                    </Nav.Link>
                  </Link>
                  <Link href={PATH.HISTORY_PAGE}>
                    <Nav.Link
                      href={PATH.HISTORY_PAGE}
                      active={props.pathname === PATH.HISTORY_PAGE}
                    >
                      Lịch sử giao dịch
                    </Nav.Link>
                  </Link>
                  <Link href={PATH.REPORT_PAGE}>
                    <Nav.Link href={PATH.REPORT_PAGE} active={props.pathname === PATH.REPORT_PAGE}>
                      Báo Cáo Thu Chi
                    </Nav.Link>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>
          <div className="col-md-3 mt-2 mt-md-0 text-left text-md-right">
            {props.componentSetting}
            <div className="mt-1">
              <Button variant="danger" size="sm" className="mt-0" onClick={props.handleLogout}>
                <i className="fa fa-sign-out" aria-hidden="true" /> Đăng Xuất
              </Button>
            </div>
          </div>
        </div>
        {props.children}
        {props.componentFooter}
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  componentFooter: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
  componentSetting: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    display_name: PropTypes.string.isRequired,
  }).isRequired,
  pathname: PropTypes.string.isRequired,
};

export default Layout;
