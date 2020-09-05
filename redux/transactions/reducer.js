import { transactionsActionTypes } from './action';

const transactionsInitialState = {
  data: [],
  length: 0,
};

export default function transactionsReducer(state = transactionsInitialState, action) {
  switch (action.type) {
    case transactionsActionTypes.SET: {
      const { data } = action;
      if (data)
        return {
          data,
          length: data.length,
        };
      return { ...state };
    }
    case transactionsActionTypes.ADD: {
      const { transaction } = action;
      const newState = [...state.data];
      newState.push(transaction);
      return {
        data: newState,
        length: newState.length,
      };
    }
    default:
      return state;
  }
}
