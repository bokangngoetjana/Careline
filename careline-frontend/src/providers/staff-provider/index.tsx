"use client";
import { axiosInstance } from "@/utils/axiosInstance";
import React, { useReducer, useContext } from "react";
import {
  IStaff,
  INITIAL_STATE,
  StaffProfileStateContext,
  StaffProfileActionContext,
} from "./context";
import {
  getProfilePending,
  getProfileSuccess,
  getProfileError,
} from "./actions";
import { StaffReducer } from "./reducer";

export const StaffProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(StaffReducer, INITIAL_STATE);
  const instance = axiosInstance;

  const getProfile = async () => {
    try {
      dispatch(getProfilePending());
      const { data } = await instance.get("/services/app/Staff/GetStaffProfile");

      const profileData = data.result;
      sessionStorage.setItem("staffId", profileData.id);
      sessionStorage.setItem("staffFullName", `${profileData.name} ${profileData.surname}`);

      dispatch(getProfileSuccess(profileData));
    } catch (error: any) {
      dispatch(getProfileError(error?.message || "Failed to load staff profile"));
    }
  };

  const setProfile = (profile: IStaff | null) => {
    dispatch(getProfileSuccess(profile));
  };

  const resetProfile = () => {
    dispatch(getProfileSuccess(null));
    sessionStorage.removeItem("staffId");
    sessionStorage.removeItem("staffFullName");
  };

  return (
    <StaffProfileStateContext.Provider value={state}>
      <StaffProfileActionContext.Provider
        value={{ getProfile, setProfile, resetProfile }}
      >
        {children}
      </StaffProfileActionContext.Provider>
    </StaffProfileStateContext.Provider>
  );
};

export const useStaffProfileState = () => {
  const context = useContext(StaffProfileStateContext);
  if (!context) {
    throw new Error("useStaffProfileState must be used within a StaffProvider");
  }
  return context;
};

export const useStaffProfileActions = () => {
  const context = useContext(StaffProfileActionContext);
  if (!context) {
    throw new Error("useStaffProfileActions must be used within a StaffProvider");
  }
  return context;
};
