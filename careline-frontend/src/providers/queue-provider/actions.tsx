"use client";
import { createAction } from "redux-actions";
import { IVisitQueue, IVisitQueueStateContext } from "./context";

export enum VisitQueueEnum {
  getVisitQueuesPending = "GET_VISIT_QUEUES_PENDING",
  getVisitQueuesSuccess = "GET_VISIT_QUEUES_SUCCESS",
  getVisitQueuesError = "GET_VISIT_QUEUES_ERROR",

  getActiveVisitQueuePending = "GET_ACTIVE_VISIT_QUEUE_PENDING",
  getActiveVisitQueueSuccess = "GET_ACTIVE_VISIT_QUEUE_SUCCESS",
  getActiveVisitQueueError = "GET_ACTIVE_VISIT_QUEUE_ERROR",

  createVisitQueuePending = "CREATE_VISIT_QUEUE_PENDING",
  createVisitQueueSuccess = "CREATE_VISIT_QUEUE_SUCCESS",
  createVisitQueueError = "CREATE_VISIT_QUEUE_ERROR",

  updateVisitQueuePending = "UPDATE_VISIT_QUEUE_PENDING",
  updateVisitQueueSuccess = "UPDATE_VISIT_QUEUE_SUCCESS",
  updateVisitQueueError = "UPDATE_VISIT_QUEUE_ERROR",

  deleteVisitQueuePending = "DELETE_VISIT_QUEUE_PENDING",
  deleteVisitQueueSuccess = "DELETE_VISIT_QUEUE_SUCCESS",
  deleteVisitQueueError = "DELETE_VISIT_QUEUE_ERROR",
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
// CREATE
export const createVisitQueuePending = createAction<IVisitQueueStateContext>(
  VisitQueueEnum.createVisitQueuePending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false
  })
);

export const createVisitQueueSuccess = createAction<IVisitQueueStateContext, IVisitQueue>(
  VisitQueueEnum.createVisitQueueSuccess,
  (visitQueue: IVisitQueue) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    visitQueues: visitQueue ? [visitQueue] : []
  })
);
export const createVisitQueueError = createAction<IVisitQueueStateContext>(
  VisitQueueEnum.createVisitQueueError,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: true
  })
);
// UPDATE
export const updateVisitQueuePending = createAction<IVisitQueueStateContext>(
  VisitQueueEnum.updateVisitQueuePending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false
  })
);

export const updateVisitQueueSuccess = createAction<IVisitQueueStateContext>(
  VisitQueueEnum.updateVisitQueueSuccess,
  () => ({
    isPending: false,
    isSuccess: true,
    isError: false
  })
);
export const updateVisitQueueError = createAction<IVisitQueueStateContext>(
  VisitQueueEnum.updateVisitQueueError,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: true
  })
);
// DELETE
export const deleteVisitQueuePending = createAction<IVisitQueueStateContext>(
  VisitQueueEnum.deleteVisitQueuePending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false
  })
);

export const deleteVisitQueueSuccess = createAction<IVisitQueueStateContext>(
  VisitQueueEnum.deleteVisitQueueSuccess,
  () => ({
    isPending: false,
    isSuccess: true,
    isError: false
  })
);
export const deleteVisitQueueError = createAction<IVisitQueueStateContext>(
  VisitQueueEnum.deleteVisitQueueError,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: true
  })
);