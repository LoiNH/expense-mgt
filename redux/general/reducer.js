import { generalActionTypes } from './action';

const generalInitialState = {
  loading: false,
};

export default function generalReducer(state = generalInitialState, action) {
  switch (action.type) {
    case generalActionTypes.LOADING_TOGGLE:
      return { ...state, loading: action.toggle };
    default:
      return state;
  }
}
