"use client";
import { createAction } from "redux-actions";
import { IMedicalHistory, IMedicalHistoryStateContext } from "./context";

export enum MedicalHistoryEnum {
    getByTicketIdPending = "GET_BY_TICKET_ID_PENDING",
    getByTicketIdSuccess = "GET_BY_TICKET_ID_SUCCESS",
    getByTicketIdError = "GET_BY_TICKET_ID_ERROR",

    getByPatientIdPending = "GET_BY_PATIENT_ID_PENDING",
    getByPatientIdSuccess = "GET_BY_PATIENT_ID_SUCCESS",
    getByPatientIdError = "GET_BY_PATIENT_ID_ERROR",

    createMedicalHistoryPending = "CREATE_MEDICAL_HISTORY_PENDING",
    createMedicalHistorySuccess = "CREATE_MEDICAL_HISTORY_SUCCESS",
    createMedicalHistoryError = "CREATE_MEDICAL_HISTORY_ERROR",
}
export const getByTicketIdPending = createAction<IMedicalHistoryStateContext>(
  MedicalHistoryEnum.getByTicketIdPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false
  })
);
export const getByTicketIdSuccess = createAction<IMedicalHistoryStateContext, IMedicalHistory>(
  MedicalHistoryEnum.getByTicketIdSuccess,
  (history: IMedicalHistory) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    medicalHistories: history ? [history] : []
  })
);
export const getByTicketIdError = createAction<IMedicalHistoryStateContext>(
  MedicalHistoryEnum.getByTicketIdError,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: true
  })
);
export const getByPatientIdPending = createAction<IMedicalHistoryStateContext>(
  MedicalHistoryEnum.getByPatientIdPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false
  })
);

export const getByPatientIdSuccess = createAction<IMedicalHistoryStateContext, IMedicalHistory[]>(
  MedicalHistoryEnum.getByPatientIdSuccess,
  (histories: IMedicalHistory[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    medicalHistories: histories
  })
);
export const getByPatientIdError = createAction<IMedicalHistoryStateContext>(
  MedicalHistoryEnum.getByPatientIdError,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: true
  })
);
export const createOrUpdatePending = createAction<IMedicalHistoryStateContext>(
  MedicalHistoryEnum.createMedicalHistoryPending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false
  })
);

export const createOrUpdateSuccess = createAction<IMedicalHistoryStateContext, IMedicalHistory>(
  MedicalHistoryEnum.createMedicalHistorySuccess,
  (history: IMedicalHistory) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    medicalHistories: history ? [history] : []
  })
);
export const createOrUpdateError = createAction<IMedicalHistoryStateContext>(
  MedicalHistoryEnum.createMedicalHistoryError,
  () => ({
    isPending: false,
    isSuccess: false,
    isError: true
  })
);