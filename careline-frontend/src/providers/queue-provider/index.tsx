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
  getVisitQueuesError,
  getActiveVisitQueuePending,
  getActiveVisitQueueSuccess,
  getActiveVisitQueueError,
  createVisitQueuePending,
  createVisitQueueSuccess,
  createVisitQueueError,
  updateVisitQueuePending,
  updateVisitQueueSuccess,
  updateVisitQueueError,
  deleteVisitQueuePending,
  deleteVisitQueueSuccess,
  deleteVisitQueueError
} from "./actions";

export const VisitQueueProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(VisitQueueReducer, INITIAL_STATE);
  const instance = axiosInstance;

  // CREATE
  const createVisitQueue = async (visitQueue: IVisitQueue) => {
    dispatch(createVisitQueuePending());
    const endpoint = "/services/app/VisitQueue/Create";
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const { data } = await instance.post(endpoint, visitQueue, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(createVisitQueueSuccess(data.result));
      await getVisitQueues(); // refresh after create
    } catch (error) {
      console.error("Failed to create visit queue", error);
      dispatch(createVisitQueueError());
    }
  };

  // UPDATE
   const updateVisitQueue = async (visitQueue: IVisitQueue): Promise<void> => {
    dispatch(updateVisitQueuePending());
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      await instance.put("/services/app/VisitQueue/Update", visitQueue, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(updateVisitQueueSuccess());
      await getVisitQueues(); // refresh after update
    } catch (error) {
      console.error("Failed to update visit queue", error);
      dispatch(updateVisitQueueError());
    }
  };

  // DELETE
  const deleteVisitQueue = async (id: string): Promise<void> => {
    dispatch(deleteVisitQueuePending());
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      await instance.delete(`/services/app/VisitQueue/Delete?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(deleteVisitQueueSuccess());
      await getVisitQueues(); // refresh after delete
    } catch (error) {
      console.error("Failed to delete visit queue", error);
      dispatch(deleteVisitQueueError());
    }
  };
  const getActiveVisitQueue = async () => {
    dispatch(getActiveVisitQueuePending());
  const endpoint: string = "/services/app/VisitQueue/GetActiveQueue";
   try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("User not authenticated");

    const { data } = await instance.get(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch(getActiveVisitQueueSuccess(data.result));
  } catch (error) {
    console.error("Failed to fetch active visit queue", error);
    dispatch(getActiveVisitQueueError());
  }
  };

  const getVisitQueues = async () => {
    dispatch(getVisitQueuesPending());
    const endpoint: string = "/services/app/VisitQueue/GetAll";

    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const { data } = await instance.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(getVisitQueuesSuccess(data.result.items));
    } catch (error) {
      console.error("Failed to fetch visit queues", error);
      dispatch(getVisitQueuesError());
    }
  };

  return (
    <VisitQueueStateContext.Provider value={state}>
      <VisitQueueActionContext.Provider value={{ getVisitQueues, getActiveVisitQueue, createVisitQueue, updateVisitQueue, deleteVisitQueue }}>
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
