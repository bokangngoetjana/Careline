import { createAction } from "redux-actions";
import { ISignalRStateContext } from "./context";
import { TicketNotification } from "@/services/signalRService";

export enum SignalRActionEnum {
  connectPending = "SIGNALR_CONNECT_PENDING",
  connectSuccess = "SIGNALR_CONNECT_SUCCESS",
  connectError = "SIGNALR_CONNECT_ERROR",
  disconnect = "SIGNALR_DISCONNECT",
  addNotification = "SIGNALR_ADD_NOTIFICATION",
  clearNotifications = "SIGNALR_CLEAR_NOTIFICATIONS",
}
export const connectPending = createAction<Partial<ISignalRStateContext>>(
  SignalRActionEnum.connectPending,
  () => ({
    isConnecting: true,
    connectionError: null,
  })
);
export const connectSuccess = createAction<Partial<ISignalRStateContext>>(
  SignalRActionEnum.connectSuccess,
  () => ({
    isConnected: true,
    isConnecting: false,
    connectionError: null,
  })
);
export const connectError = createAction<Partial<ISignalRStateContext>, string>(
  SignalRActionEnum.connectError,
  (error: string) => ({
    isConnected: false,
    isConnecting: false,
    connectionError: error,
  })
);
export const disconnect = createAction<Partial<ISignalRStateContext>>(
  SignalRActionEnum.disconnect,
  () => ({
    isConnected: false,
    isConnecting: false,
    connectionError: null,
  })
);

export const addNotification = createAction<Partial<ISignalRStateContext>, TicketNotification>(
  SignalRActionEnum.addNotification,
  (notification: TicketNotification) => ({
    notifications: [notification], // Will be handled in reducer
  })
);
export const clearNotifications = createAction<Partial<ISignalRStateContext>>(
  SignalRActionEnum.clearNotifications,
  () => ({
    notifications: [],
  })
);
