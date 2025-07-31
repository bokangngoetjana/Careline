import { handleActions } from "redux-actions";
import { INITIAL_STATE, IAuthStateContext } from "./context";
import { AuthActionEnums } from "./actions";

export const AuthReducer = handleActions<IAuthStateContext, IAuthStateContext>(
  {
    [AuthActionEnums.registerPatientPending]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [AuthActionEnums.registerPatientSuccess]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [AuthActionEnums.registerPatientError]: (state, action) => ({
      ...state,
      ...action.payload
    }),

    [AuthActionEnums.registerStaffPending]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [AuthActionEnums.registerStaffSuccess]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [AuthActionEnums.registerStaffError]: (state, action) => ({
      ...state,
      ...action.payload
    }),

    [AuthActionEnums.loginUserPending]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [AuthActionEnums.loginUserSuccess]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [AuthActionEnums.loginUserError]: (state, action) => ({
      ...state,
      ...action.payload
    })
  },
  INITIAL_STATE
);
