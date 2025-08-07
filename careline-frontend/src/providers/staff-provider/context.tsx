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
  staffList?: IStaff[];
}

export interface IStaffActionContext {
  getProfile: () => Promise<void>;
  setProfile: (profile: IStaff | null) => void;
  resetProfile: () => void;

  getStaff: () => Promise<void>
  createStaff: (staff: IStaff) => Promise<void>;
  updateStaff: (staff: IStaff) => Promise<void>;
  deleteStaff: (id: string) => Promise<void>;
}

export const INITIAL_STATE: IStaffStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
  profile: null,
  error: null,
  staffList: [],
};

export const StaffProfileStateContext = createContext<IStaffStateContext>(INITIAL_STATE);
export const StaffProfileActionContext = createContext<IStaffActionContext>(undefined!);
