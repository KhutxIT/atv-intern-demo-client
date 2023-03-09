export const alertActionType = {
  SUCCESS: 'ALERT_SUCCESS',
  ERROR: 'ALERT_ERROR',
  CLEAR: 'ALERT_CLEAR',
};

export const success = (message) => {
  return { type: alertActionType.SUCCESS, message };
};

export const error = (message) => {
  return { type: alertActionType.ERROR, message };
};

export const clear = () => {
  return { type: alertActionType.CLEAR };
};

const alertActions = {
  success,
  error,
  clear,
};

export default alertActions;
