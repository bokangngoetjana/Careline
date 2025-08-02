import { handleActions } from "redux-actions";
import  {INITIAL_STATE, IPatientStateContext} from "./context";
import { PatientActionEnum } from "./actions";
import { act } from "react";
import { stat } from "fs";

export const PatientReducer = handleActions<IPatientStateContext, IPatientStateContext>({
    [PatientActionEnum.getProfilePending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PatientActionEnum.getProfileSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PatientActionEnum.getProfileError]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PatientActionEnum.updateProfilePending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PatientActionEnum.updateProfileSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [PatientActionEnum.updateProfileError]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
}, INITIAL_STATE)