import { handleActions } from "redux-actions";
import { INITIAL_STATE, IStaffStateContext } from "./context";
import { StaffActionEnum } from "./actions";

export const StaffReducer = handleActions<IStaffStateContext, IStaffStateContext>(
  {
    [StaffActionEnum.getProfilePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StaffActionEnum.getProfileSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StaffActionEnum.getProfileError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
