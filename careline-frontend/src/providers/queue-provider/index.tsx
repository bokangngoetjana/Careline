"use client";
import { useContext, useReducer } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import {
  INITIAL_STATE,
  IVisitQueue,
  VisitQueueStateContext,
  VisitQueueActionContext
} from "./context";
import { VisitQueueReducer } from "./reducer";
import {
  getVisitQueuesPending,
  getVisitQueuesSuccess,
  getVisitQueuesError
} from "./actions";

export const VisitQueueProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(VisitQueueReducer, INITIAL_STATE);
  const instance = axiosInstance;

  const getVisitQueues = async () => {
    dispatch(getVisitQueuesPending());
    const endpoint: string = "/services/app/VisitQueue/GetAll";

    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const { data } = await instance.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ABP typically returns { result: { items: [] } }
      dispatch(getVisitQueuesSuccess(data.result.items));
    } catch (error) {
      console.error("Failed to fetch visit queues", error);
      dispatch(getVisitQueuesError());
    }
  };

  return (
    <VisitQueueStateContext.Provider value={state}>
      <VisitQueueActionContext.Provider value={{ getVisitQueues }}>
        {children}
      </VisitQueueActionContext.Provider>
    </VisitQueueStateContext.Provider>
  );
};

export const useVisitQueueState = () => {
  const context = useContext(VisitQueueStateContext);
  if (!context) {
    throw new Error("useVisitQueueState must be used within a VisitQueueProvider");
  }
  return context;
};

export const useVisitQueueActions = () => {
  const context = useContext(VisitQueueActionContext);
  if (!context) {
    throw new Error("useVisitQueueActions must be used within a VisitQueueProvider");
  }
  return context;
};
