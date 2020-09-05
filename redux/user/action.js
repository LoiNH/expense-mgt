export const userActionTypes = {
  SET: 'SET',
  LOGIN: 'LOGIN',
  REMOVE: 'REMOVE',
};

export const setUser = (user) => {
  return { type: userActionTypes.SET, user };
};

export const loginUser = (user, remember) => (dispatch) => {
  return dispatch({ type: userActionTypes.LOGIN, user, remember });
};

export const removeUser = () => (dispatch) => {
  return dispatch({ type: userActionTypes.REMOVE });
};
