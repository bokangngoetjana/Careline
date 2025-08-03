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
  },
  INITIAL_STATE
);
