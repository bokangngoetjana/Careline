import { handleActions } from "redux-actions";
import { INITIAL_STATE, IMedicalHistoryStateContext } from "./context";
import { MedicalHistoryEnum } from "./actions";

export const MedicalHistoryReducer = handleActions<IMedicalHistoryStateContext, IMedicalHistoryStateContext>(
  {
    [MedicalHistoryEnum.getByTicketIdPending]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [MedicalHistoryEnum.getByTicketIdSuccess]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [MedicalHistoryEnum.getByTicketIdError]: (state, action) => ({
      ...state,
      ...action.payload
    }),

    [MedicalHistoryEnum.getByPatientIdPending]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [MedicalHistoryEnum.getByPatientIdSuccess]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [MedicalHistoryEnum.getByPatientIdError]: (state, action) => ({
      ...state,
      ...action.payload
    }),

    [MedicalHistoryEnum.createMedicalHistoryPending]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [MedicalHistoryEnum.createMedicalHistorySuccess]: (state, action) => ({
      ...state,
      ...action.payload
    }),
    [MedicalHistoryEnum.createMedicalHistoryError]: (state, action) => ({
      ...state,
      ...action.payload
    }),
  },
  INITIAL_STATE
);
