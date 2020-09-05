export const generalActionTypes = {
  LOADING_TOGGLE: 'LOADING_TOGGLE',
};

export const loadingToggle = (toggle) => (dispatch) => {
  return dispatch({ type: generalActionTypes.LOADING_TOGGLE, toggle });
};
