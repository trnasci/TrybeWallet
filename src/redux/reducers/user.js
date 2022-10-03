import { SUBMIT_USER_PROFILE } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_USER_PROFILE:
    return { email: action.payload };
  default:
    return state;
  }
};

export default user;
