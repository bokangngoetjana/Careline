"use client";
import { useContext, useReducer, useRef, useEffect } from "react";
import { SignalRService, TicketNotification } from "@/services/signalRService";
import {
  INITIAL_STATE,
  SignalRActionContext,
  SignalRStateContext
} from "./context";
import { SignalRReducer } from "./reducer";
import {
  connectPending,
  connectSuccess,
  connectError,
  disconnect,
  addNotification,
  clearNotifications
} from "./actions";

export const SignalRProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(SignalRReducer, INITIAL_STATE);
  const serviceRef = useRef<SignalRService | null>(null);

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:44311";
    serviceRef.current = new SignalRService(baseUrl);

    const service = serviceRef.current;

    const handleTicketCreated = (notification: TicketNotification) => {
      dispatch(addNotification(notification));
      console.log("Ticket created notification:", notification);
    };

    const handleYourTicketCreated = (notification: TicketNotification) => {
      dispatch(addNotification(notification));
      console.log("Your ticket created:", notification);
    };

    const handleTicketStatusUpdated = (notification: TicketNotification) => {
      dispatch(addNotification(notification));
      console.log("Ticket status updated:", notification);
    };

    const handleYourTicketUpdated = (notification: TicketNotification) => {
      dispatch(addNotification(notification));
      console.log("Your ticket updated:", notification);
    };

    const handleQueueUpdated = (data: { queueId: string }) => {
      console.log("Queue updated:", data);
    };

    const handleNewTicketAlert = (notification: TicketNotification) => {
      dispatch(addNotification(notification));
      console.log("New ticket alert for staff:", notification);
    };

    service.on("TicketCreated", handleTicketCreated);
    service.on("YourTicketCreated", handleYourTicketCreated);
    service.on("TicketStatusUpdated", handleTicketStatusUpdated);
    service.on("YourTicketUpdated", handleYourTicketUpdated);
    service.on("QueueUpdated", handleQueueUpdated);
    service.on("NewTicketAlert", handleNewTicketAlert);

    return () => {
      service.off("TicketCreated", handleTicketCreated);
      service.off("YourTicketCreated", handleYourTicketCreated);
      service.off("TicketStatusUpdated", handleTicketStatusUpdated);
      service.off("YourTicketUpdated", handleYourTicketUpdated);
      service.off("QueueUpdated", handleQueueUpdated);
      service.off("NewTicketAlert", handleNewTicketAlert);
      service.disconnect();
    };
  }, []);

  const connect = async () => {
    if (!serviceRef.current) return;

    dispatch(connectPending());

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await serviceRef.current.connect(token);
      dispatch(connectSuccess());
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Connection failed";
      dispatch(connectError(errorMessage));
      console.error("SignalR connection failed:", error);
    }
  };

  const disconnectSignalR = async () => {
    if (serviceRef.current) {
      await serviceRef.current.disconnect();
      dispatch(disconnect());
    }
  };

  const joinQueue = async (queueId: string) => {
    try {
      if (serviceRef.current?.isConnected) {
        await serviceRef.current.joinQueue(queueId); // This now hits SignalR AND backend
        console.log("Joined queue and notified backend:", queueId);
      }
    } catch (err) {
      console.error("Failed to join queue:", err);
    }
  };

  const leaveQueue = async (queueId: string) => {
    if (serviceRef.current?.isConnected) {
      await serviceRef.current.leaveQueue(queueId);
    }
  };

  const joinStaffNotifications = async () => {
    if (serviceRef.current?.isConnected) {
      await serviceRef.current.joinStaffNotifications();
    }
  };

  const clearNotificationsAction = () => {
    dispatch(clearNotifications());
  };

  return (
    <SignalRStateContext.Provider value={state}>
      <SignalRActionContext.Provider
        value={{
          connect,
          disconnect: disconnectSignalR,
          joinQueue,
          leaveQueue,
          joinStaffNotifications,
          clearNotifications: clearNotificationsAction,
          service: serviceRef.current
        }}
      >
        {children}
      </SignalRActionContext.Provider>
    </SignalRStateContext.Provider>
  );
};

export const useSignalRState = () => {
  const context = useContext(SignalRStateContext);
  if (!context) {
    throw new Error("useSignalRState must be used within a SignalRProvider");
  }
  return context;
};

export const useSignalRActions = () => {
  const context = useContext(SignalRActionContext);
  if (!context) {
    throw new Error("useSignalRActions must be used within a SignalRProvider");
  }
  return context;
};
