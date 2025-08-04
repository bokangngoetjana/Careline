"use client";
import { createAction } from "redux-actions";
import { IStaff, IStaffStateContext } from "./context";

export enum StaffActionEnum {
  getProfilePending = "GET_STAFF_PROFILE_PENDING",
  getProfileSuccess = "GET_STAFF_PROFILE_SUCCESS",
  getProfileError = "GET_STAFF_PROFILE_ERROR",
}

export const getProfilePending = createAction<IStaffStateContext>(
  StaffActionEnum.getProfilePending,
  () => ({
    isPending: true,
    isSuccess: false,
    isError: false,
    error: null,
  })
);

export const getProfileSuccess = createAction<IStaffStateContext, IStaff | null>(
  StaffActionEnum.getProfileSuccess,
  (profile: IStaff | null) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    profile,
    error: null,
  })
);

export const getProfileError = createAction<IStaffStateContext, string>(
  StaffActionEnum.getProfileError,
  (error: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    error,
  })
);
