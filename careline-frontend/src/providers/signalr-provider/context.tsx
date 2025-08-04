import { createContext } from "react";
import { SignalRService, TicketNotification } from "@/services/signalRService";

export interface ISignalRStateContext {
  isConnected: boolean;
  isConnecting: boolean;
  connectionError: string | null;
  notifications: TicketNotification[];
}

export interface ISignalRActionContext {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  joinQueue: (queueId: string) => Promise<void>;
  leaveQueue: (queueId: string) => Promise<void>;
  joinStaffNotifications: () => Promise<void>;
  clearNotifications: () => void;
  service: SignalRService | null;
}
export const INITIAL_STATE: ISignalRStateContext = {
  isConnected: false,
  isConnecting: false,
  connectionError: null,
  notifications: [],
};
export const SignalRStateContext = createContext<ISignalRStateContext>(INITIAL_STATE);
export const SignalRActionContext = createContext<ISignalRActionContext>(undefined!);
