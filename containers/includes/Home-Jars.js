import HomeJars from 'components/includes/Home-Jars';
import HomeJarsItem from 'components/includes/Home-Jars-Item';
import * as ALERT from 'constants/alert';
import { JARS } from 'constants/general';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadingToggle } from 'redux/general/action';
import { setUser } from 'redux/user/action';
import { updateUser } from 'utils/firebase';
import { objectToArray, objectTotalValues } from 'helpers/object';

const HomeJarsContainer = (props) => {
  const { user } = props;
  const [alert, setAlert] = useState(ALERT.ALERT_DEFAULT);
  const [inputValues, setInputValues] = useState(() => {
    const value = {};
    JARS.forEach((element) => {
      value[element.nameCode] = 0;
    });
    return value;
  });
  const [remain, setRemain] = useState(100);
  const [total, setTotal] = useState(0);
  const [dataCharts, setDataCharts] = useState([]);

  useEffect(() => {
    setInputValues({ ...user.balance.percent });
  }, []);

  useEffect(() => {
    const totalPercent = objectTotalValues(inputValues);
    const charts = objectToArray(inputValues);
    const handleTotal = 100 - totalPercent;
    setTotal(totalPercent);
    setRemain(handleTotal > 0 ? handleTotal : 0);
    setDataCharts(charts);
  }, [inputValues]);

  const onSubmit = (e) => {
    e.preventDefault();
    setAlert({});
    props.loadingToggle(true);
    setTimeout(() => {
      if (total <= 100) {
        updateUser(user._id, { balance: { ...user.balance, percent: inputValues } }).then((res) => {
          if (res) {
            setAlert(ALERT.UPDATE_DATA_SUCCESS);
            props.setUser(res);
          }
        });
      } else setAlert(ALERT.JARS_PERCENT_OVER);
      props.loadingToggle(false);
    }, 500);
  };

  const renderFormJar = (jars) => {
    let result = null;
    result = jars.map((jar) => {
      return (
        <HomeJarsItem
          key={jar.name}
          jar={jar}
          value={inputValues[jar.nameCode]}
          onChange={onChange}
        />
      );
    });
    return result;
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputValues({
      ...inputValues,
      [name]: parseInt(value, 10) || 0,
    });
  };

  return (
    <HomeJars
      alert={alert}
      dataCharts={dataCharts}
      onSubmit={onSubmit}
      remain={remain}
      total={total}
    >
      {renderFormJar(JARS)}
    </HomeJars>
  );
};

HomeJarsContainer.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string,
    jars: PropTypes.shape({}),
    balance: PropTypes.shape({
      percent: PropTypes.shape({}),
    }),
  }),
  loadingToggle: PropTypes.func,
  setUser: PropTypes.func,
};

HomeJarsContainer.defaultProps = {
  user: {
    _id: '',
    jars: {},
    balance: {
      percent: {},
    },
  },
  loadingToggle: null,
  setUser: null,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadingToggle: bindActionCreators((toggle) => loadingToggle(toggle), dispatch),
    setUser: bindActionCreators((user) => setUser(user), dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeJarsContainer);
