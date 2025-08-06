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
    [StaffActionEnum.getStaffPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StaffActionEnum.getStaffSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StaffActionEnum.getStaffError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StaffActionEnum.createStaffPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StaffActionEnum.createStaffSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StaffActionEnum.createStaffError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StaffActionEnum.updateStaffPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StaffActionEnum.updateStaffSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StaffActionEnum.updateStaffError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StaffActionEnum.deleteStaffPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StaffActionEnum.deleteStaffSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [StaffActionEnum.deleteStaffError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
