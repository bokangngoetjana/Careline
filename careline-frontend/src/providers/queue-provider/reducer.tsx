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
  },
  INITIAL_STATE
);
