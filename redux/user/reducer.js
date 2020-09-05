import jwt from 'jsonwebtoken';
import { userActionTypes } from './action';

const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;

const userInitialState = {
  _id: '',
  user_email: '',
  user_login: '',
  user_pass: '',
  display_name: '',
};

export default function userReducer(state = userInitialState, action) {
  switch (action.type) {
    case userActionTypes.SET: {
      const { user } = action;
      if (user) return { ...user };
      return { ...state };
    }
    case userActionTypes.LOGIN: {
      const { user, remember } = action;
      const userStorage = jwt.sign(user._id, PRIVATE_KEY);
      localStorage.removeItem('.config_user');
      sessionStorage.removeItem('.config_user');
      if (remember) localStorage.setItem('.config_user', JSON.stringify(userStorage));
      else sessionStorage.setItem('.config_user', JSON.stringify(userStorage));
      return { ...user };
    }
    case userActionTypes.REMOVE: {
      localStorage.removeItem('.config_user');
      sessionStorage.removeItem('.config_user');
      return { ...userInitialState };
    }
    default:
      return state;
  }
}
