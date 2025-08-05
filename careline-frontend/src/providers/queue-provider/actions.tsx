"use client";
import { createAction } from "redux-actions";
import { IVisitQueue, IVisitQueueStateContext } from "./context";

export enum VisitQueueEnum {
  getVisitQueuesPending = "GET_VISIT_QUEUES_PENDING",
  getVisitQueuesSuccess = "GET_VISIT_QUEUES_SUCCESS",
  getVisitQueuesError = "GET_VISIT_QUEUES_ERROR",

  getActiveVisitQueuePending = "GET_ACTIVE_VISIT_QUEUE_PENDING",
  getActiveVisitQueueSuccess = "GET_ACTIVE_VISIT_QUEUE_SUCCESS",
  getActiveVisitQueueError = "GET_ACTIVE_VISIT_QUEUE_ERROR"
}
export const getActiveVisitQueuePending = createAction<IVisitQueueStateContext>(
  VisitQueueEnum.getActiveVisitQueuePending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false
  })
);

export const getActiveVisitQueueSuccess = createAction<IVisitQueueStateContext, IVisitQueue>(
  VisitQueueEnum.getActiveVisitQueueSuccess,
  (queue: IVisitQueue) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    visitQueues: queue ? [queue] : [] // Wrap in array so it fits same structure
  })
);

export const getActiveVisitQueueError = createAction<IVisitQueueStateContext>(
  VisitQueueEnum.getActiveVisitQueueError,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: true
  })
);
export const getVisitQueuesPending = createAction<IVisitQueueStateContext>(
  VisitQueueEnum.getVisitQueuesPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false
  })
);

export const getVisitQueuesSuccess = createAction<IVisitQueueStateContext, IVisitQueue[]>(
  VisitQueueEnum.getVisitQueuesSuccess,
  (visitQueues: IVisitQueue[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    visitQueues
  })
);

export const getVisitQueuesError = createAction<IVisitQueueStateContext>(
  VisitQueueEnum.getVisitQueuesError,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: true
  })
);
