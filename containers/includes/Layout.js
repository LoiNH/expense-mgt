import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/includes/Layout';
import Loading from 'components/includes/Loading';
import { connect } from 'react-redux';

const LayoutContainer = (props) => {
  return (
    <>
      {props.loading ? <Loading /> : null}
      <Layout title={props.title}>{props.children}</Layout>
    </>
  );
};

LayoutContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  loading: PropTypes.bool,
  title: PropTypes.string,
};

LayoutContainer.defaultProps = {
  children: createElement('div'),
  loading: false,
  title: '',
};

const mapStateToProps = (state) => {
  return {
    loading: state.general.loading,
  };
};

export default connect(mapStateToProps)(LayoutContainer);
