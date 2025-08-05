"use client";
import { useContext, useReducer } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import {
  INITIAL_STATE,
  IMedicalHistory,
  MedicalHistoryStateContext,
  MedicalHistoryActionContext
} from "./context";
import { MedicalHistoryReducer } from "./reducer";
import {
  getByTicketIdPending,
  getByTicketIdSuccess,
  getByTicketIdError,
  getByPatientIdPending,
  getByPatientIdSuccess,
  getByPatientIdError,
  createOrUpdatePending,
  createOrUpdateSuccess,
  createOrUpdateError
} from "./actions";

export const MedicalHistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(MedicalHistoryReducer, INITIAL_STATE);
  const instance = axiosInstance;

  const getByTicketId = async (ticketId: string) => {
    dispatch(getByTicketIdPending());
    const endpoint = `/services/app/MedHistory/GetByTicketId?ticketId=${ticketId}`;
    try {
      const { data } = await instance.get(endpoint);
      dispatch(getByTicketIdSuccess(data.result));
    } catch (error) {
      console.error("Failed to fetch medical history by ticket ID", error);
      dispatch(getByTicketIdError());
    }
  };

  const getByPatientId = async (patientId: string) => {
    dispatch(getByPatientIdPending());
    const endpoint = `/services/app/MedHistory/GetByPatientId?patientId=${patientId}`;
    try {
      const { data } = await instance.get(endpoint);
      dispatch(getByPatientIdSuccess(data.result));
    } catch (error) {
      console.error("Failed to fetch medical histories by patient ID", error);
      dispatch(getByPatientIdError());
    }
  };

  const createMedicalHistory = async (history: IMedicalHistory) => {
    dispatch(createOrUpdatePending());
    const endpoint = "/services/app/MedHistory/Create";
    try {
      const { data } = await instance.post(endpoint, history);
      dispatch(createOrUpdateSuccess(data.result));
    } catch (error) {
      console.error("Failed to create/update medical history", error);
      dispatch(createOrUpdateError());
    }
  };

  return (
    <MedicalHistoryStateContext.Provider value={state}>
      <MedicalHistoryActionContext.Provider
        value={{
          getByTicketId,
          getByPatientId,
          createMedicalHistory
        }}
      >
        {children}
      </MedicalHistoryActionContext.Provider>
    </MedicalHistoryStateContext.Provider>
  );
};

export const useMedicalHistoryState = () => {
  const context = useContext(MedicalHistoryStateContext);
  if (!context) {
    throw new Error("useMedicalHistoryState must be used within a MedicalHistoryProvider");
  }
  return context;
};

export const useMedicalHistoryActions = () => {
  const context = useContext(MedicalHistoryActionContext);
  if (!context) {
    throw new Error("useMedicalHistoryActions must be used within a MedicalHistoryProvider");
  }
  return context;
};
