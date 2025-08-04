"use client";
import { createContext } from "react";

export interface IStaff {
  id?: string;
  name?: string;
  surname?: string;
  employeeNo?: string;
  userName?: string;
}

export interface IStaffStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  profile?: IStaff | null;
  error?: string | null;
}

export interface IStaffActionContext {
  getProfile: () => Promise<void>;
  setProfile: (profile: IStaff | null) => void;
  resetProfile: () => void;
}

export const INITIAL_STATE: IStaffStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  profile: null,
  error: null,
};

export const StaffProfileStateContext = createContext<IStaffStateContext>(INITIAL_STATE);
export const StaffProfileActionContext = createContext<IStaffActionContext>(undefined!);
