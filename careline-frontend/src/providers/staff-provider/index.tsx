"use client";
import { axiosInstance } from "@/utils/axiosInstance";
import React, { useReducer, useContext, useEffect } from "react";
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
  createStaffPending,
  createStaffSuccess,
  createStaffError,
  getStaffPending,
  getStaffSuccess,
  getStaffError,
  updateStaffPending,
  updateStaffSuccess,
  updateStaffError,
  deleteStaffPending,
  deleteStaffSuccess,
  deleteStaffError
} from "./actions";
import { StaffReducer } from "./reducer";

export const StaffProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(StaffReducer, INITIAL_STATE);
  const instance = axiosInstance;

  // PROFILE
  const getProfile = async () => {
    try {
      dispatch(getProfilePending());
      const { data } = await instance.get("/services/app/Staff/GetStaffProfile");
      dispatch(getProfileSuccess(data.result));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to load staff profile";
      dispatch(getProfileError(errorMessage));
    }
  };

  const setProfile = (profile: IStaff | null) => {
    dispatch(getProfileSuccess(profile as IStaff));
  };

  const resetProfile = () => {
    dispatch(getProfileSuccess(null));
    sessionStorage.removeItem("staffId");
    sessionStorage.removeItem("staffFullName");
  };
    useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role === "Nurse" || role === "Doctor") {
      getProfile();
    }
  }, []);

  // ADMIN CRUD
  const getStaff = async () => {
    dispatch(getStaffPending());
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const { data } = await instance.get("/services/app/Staff/GetAll", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(getStaffSuccess(data.result.items || []));
    } catch (error) {
      dispatch(getStaffError());
      console.log(error);
    }
  };

  // CREATE STAFF
  const createStaff = async (staff: IStaff) => {
    dispatch(createStaffPending());
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      const { data } = await instance.post("/services/app/Staff/Create", staff, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(createStaffSuccess(data.result));
      await getStaff(); // refresh
    } catch (error) {
      dispatch(createStaffError());
    }
  };

  // UPDATE
  const updateStaff = async (staff: IStaff) => {
    dispatch(updateStaffPending());
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      await instance.put("/services/app/Staff/Update", staff, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(updateStaffSuccess());
      await getStaff(); // refresh
    } catch (error) {
      dispatch(updateStaffError());
      console.log(error);
    }
  };

  // DELETE
  const deleteStaff = async (id: string) => {
    dispatch(deleteStaffPending());
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");

      await instance.delete(`/services/app/Staff/Delete?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(deleteStaffSuccess());
      await getStaff(); // refresh
    } catch (error) {
      dispatch(deleteStaffError());
      console.log(error);
    }
  };
  return (
    <StaffProfileStateContext.Provider value={state}>
      <StaffProfileActionContext.Provider
        value={{ getProfile, setProfile, resetProfile, getStaff, createStaff, updateStaff, deleteStaff }}
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
