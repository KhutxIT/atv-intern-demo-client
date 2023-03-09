import { socketActionType } from '../action/socketAction';

const initState = {};

const socketReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case socketActionType.LISTENING_EVENT:
      return payload;
    default:
      return state;
  }
};

export default socketReducer;
