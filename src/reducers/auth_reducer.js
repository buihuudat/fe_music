import * as types from '../constant/action_constant';

const initialState = {
  authenticated: false,
  user: {},
  fullname: '',
  email: '',
  phone: '',
  primary: '',
  avatar: '',
  errors: {},
  isProcessing: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case types.SIGN_UP_SUCCESS:
  case types.LOG_IN_SUCCESS:
    return {
      ...state,
      email: action.email,
      fullname: action.fullname,
      primary: action.primary,
      avatar: action.avatar,
      phone: action.phone,
      user: action.user,
      authenticated: true,
    };

  case types.SIGN_UP_FAILURE:
  case types.LOG_IN_FAILURE:
    return { ...state, errors: action.errors };

  case types.LOG_OUT:
    return { ...state, user: {}, authenticated: false };

  case types.START_PROCESSING:
    return { ...state, isProcessing: true };

  case types.FINISH_PROCESSING:
    return { ...state, isProcessing: false };

  case types.CLEAR_ERRORS:
    return { ...state, errors: {} };

  default:
    return state;
  }
}
