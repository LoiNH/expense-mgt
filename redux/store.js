import { createStore, applyMiddleware, combineReducers } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import count from 'redux/count/reducer';
import general from 'redux/general/reducer';
import user from 'redux/user/reducer';
import transactions from 'redux/transactions/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production')
    return composeWithDevTools(applyMiddleware(...middleware));
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  count,
  general,
  user,
  transactions,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  }
  return combinedReducer(state, action);
};

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export default createWrapper(initStore);
