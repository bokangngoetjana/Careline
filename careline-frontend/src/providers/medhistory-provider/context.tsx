"use client";
import { createContext } from "react";

export interface IMedicalHistory {
  id?: string;
  ticketId: string;
  notes?: string;
  medicationPrescribed?: string;
  followUpInstructions?: string;
  bloodPressure?: string;
  weight?: number;
  dosage?: string;
}
export interface IMedicalHistoryStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  medicalHistories?: IMedicalHistory[];
}
export interface IMedicalHistoryActionContext {
  getByTicketId: (ticketId: string) => Promise<void>;
  getByPatientId: (patientId: string) => Promise<void>;
  createMedicalHistory: (history: IMedicalHistory) => Promise<void>;
}
export const INITIAL_STATE: IMedicalHistoryStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  medicalHistories: [],
};
export const MedicalHistoryStateContext = createContext<IMedicalHistoryStateContext>(INITIAL_STATE);
export const MedicalHistoryActionContext = createContext<IMedicalHistoryActionContext>(undefined!);
