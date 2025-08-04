import { handleActions } from "redux-actions";
import { INITIAL_STATE, ISignalRStateContext } from "./context";
import { SignalRActionEnum } from "./actions";

export const SignalRReducer = handleActions<ISignalRStateContext, any>({
  [SignalRActionEnum.connectPending]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [SignalRActionEnum.connectSuccess]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [SignalRActionEnum.connectError]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [SignalRActionEnum.disconnect]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [SignalRActionEnum.addNotification]: (state, action) => ({
    ...state,
    notifications: [...state.notifications, action.payload.notifications[0]],
  }),
  [SignalRActionEnum.clearNotifications]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
}, INITIAL_STATE);