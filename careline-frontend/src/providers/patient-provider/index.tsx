"use client"
import { axiosInstance } from "@/utils/axiosInstance";
import React, {useReducer} from "react";
import {IPatient, INITIAL_STATE, PatientProfileActionContext, PatientProfileStateContext, IPatientActionContext } from "./context";
import {
    getProfilePending,
    getProfileSuccess,
    getProfileError,
    updateProfilePending,
    updateProfileSuccess,
    updateProfileError,
} from "./actions";
import { PatientReducer } from "./reducer";

export const PatientProvider = ({children} : {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(PatientReducer, INITIAL_STATE);
    const instance = axiosInstance;

    const getProfile = async () => {
        try{
            dispatch(getProfilePending());
            const { data } = await instance.get("/services/app/Patient/GetPatientProfile");
            dispatch(getProfileSuccess(data.result));
        }catch (error: unknown) { // Changed from any to unknown
      const errorMessage = error instanceof Error ? error.message : "Failed to load staff profile";
      dispatch(getProfileError(errorMessage));
    }
    }
    const updateProfile = async (data: Partial<IPatient>) => {
    try {
      dispatch(updateProfilePending());
      const { data: updated } = await axiosInstance.put("/services/app/Patient/UpdatePatientProfile", data);
      dispatch(updateProfileSuccess(updated.result));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to update patient profile";
      dispatch(updateProfileError(errorMessage));
    }
  };
  const setProfile = (profile: IPatient | null) => {
    dispatch(getProfileSuccess(profile as IPatient));
  };

  const resetProfile = () => {
    dispatch(getProfileSuccess(null));
  };

  return(
    <PatientProfileStateContext.Provider value={state}>
        <PatientProfileActionContext.Provider value={{getProfile, updateProfile, setProfile, resetProfile}}>
            {children}
        </PatientProfileActionContext.Provider>
    </PatientProfileStateContext.Provider>
  );
};