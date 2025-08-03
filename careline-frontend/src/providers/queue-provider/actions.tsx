"use client";
import { createAction } from "redux-actions";
import { IVisitQueue, IVisitQueueStateContext } from "./context";

export enum VisitQueueEnum {
  getVisitQueuesPending = "GET_VISIT_QUEUES_PENDING",
  getVisitQueuesSuccess = "GET_VISIT_QUEUES_SUCCESS",
  getVisitQueuesError = "GET_VISIT_QUEUES_ERROR",
}

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
