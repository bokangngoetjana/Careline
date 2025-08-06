import { handleActions } from "redux-actions";
import { INITIAL_STATE, IVisitQueueStateContext } from "./context";
import { VisitQueueEnum } from "./actions";

export const VisitQueueReducer = handleActions<IVisitQueueStateContext, IVisitQueueStateContext>(
  {
    [VisitQueueEnum.getVisitQueuesPending]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [VisitQueueEnum.getVisitQueuesSuccess]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [VisitQueueEnum.getVisitQueuesError]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [VisitQueueEnum.getActiveVisitQueuePending]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [VisitQueueEnum.getActiveVisitQueueSuccess]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [VisitQueueEnum.getActiveVisitQueueError]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [VisitQueueEnum.createVisitQueuePending]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [VisitQueueEnum.createVisitQueueSuccess]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [VisitQueueEnum.createVisitQueueError]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [VisitQueueEnum.updateVisitQueuePending]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [VisitQueueEnum.updateVisitQueueSuccess]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [VisitQueueEnum.updateVisitQueueError]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [VisitQueueEnum.deleteVisitQueuePending]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [VisitQueueEnum.deleteVisitQueueSuccess]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [VisitQueueEnum.deleteVisitQueueError]: (state, action) => ({
      ...state,
      ...action.payload
    }),
  },
  INITIAL_STATE
);
