"use client";
import { createContext } from "react";

export interface IPatient{
    id?: string;
    name?: string;
    surname?: string;
    userName?: string;
    email?: string;
    identityNo?: number;
}
export interface IPatientStateContext{
     isPending: boolean;
     isSuccess: boolean;
     isError: boolean;
     profile?: IPatient | null;
     error?: string | null;
}
export interface IPatientActionContext{
    getProfile: () => Promise<void>;
    updateProfile: (data: Partial<IPatient>) => Promise<void>;
    setProfile: (profile: IPatient | null) => void;
    resetProfile: () => void;
}
export const INITIAL_STATE: IPatientStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
    profile: null,
    error: null,
}
export const PatientProfileStateContext = createContext<IPatientStateContext>(INITIAL_STATE);
export const PatientProfileActionContext = createContext<IPatientActionContext>(undefined!);