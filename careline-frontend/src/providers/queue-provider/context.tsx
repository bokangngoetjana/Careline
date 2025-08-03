"use client";
import { createContext } from "react";

export interface IVisitQueue {
  id?: string;
  name: string;
  startTime: string;
  endTime: string;
  status: number; // QueueStatus enum
}

export interface IVisitQueueStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  visitQueues?: IVisitQueue[];
}

export interface IVisitQueueActionContext {
  getVisitQueues: () => Promise<void>;
}

export const INITIAL_STATE: IVisitQueueStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  visitQueues: [],
};

export const VisitQueueStateContext = createContext<IVisitQueueStateContext>(INITIAL_STATE);
export const VisitQueueActionContext = createContext<IVisitQueueActionContext>(undefined!);
