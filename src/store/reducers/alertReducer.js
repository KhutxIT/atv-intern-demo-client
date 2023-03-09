import { alertActionType } from '../action/alertAction';

const alert = (state = {}, action) => {
  switch (action.type) {
    case alertActionType.SUCCESS:
      return {
        type: 'success',
        message: action.message,
      };
    case alertActionType.ERROR:
      return {
        type: 'error',
        message: action.message,
      };
    case alertActionType.CLEAR:
      return {};
    default:
      return state;
  }
};

export default alert;
